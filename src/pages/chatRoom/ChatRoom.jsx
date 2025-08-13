import * as Styled from './ChatRoom.style.js';
import { useState, useEffect, useRef, useMemo } from 'react';
import ChatMessage from './ChatMessage';
import ChatInput from './ChatInput';
import useChatWS from '../../hooks/useChatWS';
import { useParams, useNavigate } from 'react-router-dom';
import { getAccessToken } from '../../auth/tokenStore';

const BASE_HTTP = 'http://43.201.70.73';

// 날짜 라벨 포맷
function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString('ko-KR', {
    year: 'numeric', month: 'long', day: 'numeric', weekday: 'short',
  });
}
// 두 메시지가 서로 다른 날짜인지
function isDifferentDay(date1, date2) {
  return new Date(date1).toDateString() !== new Date(date2).toDateString();
}

const ChatRoom = () => {
  // 화면에 그릴 메시지들(정규화된 형태)
  const [chatMessages, setChatMessages] = useState([]);
  // 현재 방의 id / 표시용 이름
  const [roomId, setRoomId] = useState(null);
  const [roomName, setRoomName] = useState(null);
  // 리스트 하단 스크롤용 ref
  const messagesEndRef = useRef(null);

  // 인증 정보
  const token = getAccessToken();
  const [myUserId, setMyUserId] = useState(Number(localStorage.getItem('userId')) || null);
  const [myUsername, setMyUsername] = useState(localStorage.getItem('username') || null);


  // 내 userId 없으면 한 번 조회해서 저장
  useEffect(() => {
  if (!token || (myUserId && myUsername)) return; // 둘 다 있으면 스킵
  (async () => {
    try {
      const meRes = await fetch(`${BASE_HTTP}/api/users/mypage/`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (meRes.ok) {
        const me = await meRes.json();
        console.log('내 정보:', me);
        
        if (me?.id) {
          localStorage.setItem('userId', String(me.id));
          setMyUserId(me.id);
        }
        
        if (me?.username) {
          localStorage.setItem('username', me.username);
          setMyUsername(me.username);
        }
      } else {
        console.warn('[ChatRoom] /mypage 실패', meRes.status);
      }
    } catch (err) {
      console.error('[ChatRoom] /mypage 에러', err);
    }
  })();
}, [token, myUserId, myUsername]);

  // 주소의 /chatRoom/:roomId
  const { roomId: roomIdParam } = useParams();
  const navigate = useNavigate();

  // 하단으로 스크롤
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // 1) URL에서 방 번호 가져오기 + 없으면 로그인 창으로
  useEffect(() => {
    if (!token) {
      navigate('/login');
      return;
    }
    if (!roomIdParam) {
      navigate('/chatList');
      return;
    }
    setRoomId(Number(roomIdParam));
  }, [roomIdParam, token, navigate]);

  // 2) 방 상세를 읽어 이름만 보완(REST)
  useEffect(() => {
    if (!token || roomId == null) return;
    (async () => {
      try {
        const res = await fetch(`${BASE_HTTP}/chat/chatrooms/${roomId}/`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const details = await res.json().catch(() => ({}));
        
        // 상대 닉네임 계산
        const meId = myUserId ?? details?.me_id;
        const u1 = details.user1_info, u2 = details.user2_info;
        const meIsU1 = (details.user1 === meId) || (u1?.id === meId);
        const partner = meIsU1 ? u2 : u1;
        const partnerName =
          partner?.username || partner?.account_id ||
          details.room_name || details.name || `room: ${roomId}`;
        setRoomName(partnerName);
        
        // 기존 메시지 불러오기
        if (details.messages && Array.isArray(details.messages)) {
          const pastMessages = details.messages.map((msg) => {
            const senderId = typeof msg.sender === 'object' ? msg.sender?.id : msg.sender;
            return {
              id: msg.id,
              sender: senderId === meId ? 'me' : 'other',
              type: msg.image_url ? 'image' : 'text',
              content: msg.content || msg.message || '',
              image: msg.image_url || null,
              createdTime: msg.created_at || msg.timestamp,
            };
          });
          setChatMessages(pastMessages);
        }
        
        // 헤더 타이틀로 주입
        navigate('', { replace: true, state: { headerTitle: partnerName } });
      } catch {
        setRoomName(String(roomId));
      }
    })();
  }, [roomId, token, myUserId, navigate]);

  // 3) 실시간 메시지(WS) 원본을 받아서 화면 스키마로 변환
  const { status, messages: liveRaw, sendText } =
    useChatWS({ roomId, token, withToken: true });

  const liveMessages = useMemo(() => {
    return liveRaw.map((d) => {
      return {
        id: d.id,
        sender: d.sender === myUsername ? 'me' : 'other',
        type: d.image_url ? 'image' : 'text',
        content: d.content || '',
        image: d.image_url || null,
        createdTime: d.created_at,
      };
    });
  }, [liveRaw, myUsername]);

  // 4) 과거(낙관적 포함) + 실시간을 합치고, 중복 제거 + 시간순 정렬
  const allMessages = useMemo(() => {
    const merged = [...chatMessages, ...liveMessages];
    const dedup = merged.filter((m, i, arr) => {
      const sameId = arr.findIndex((x) => x.id === m.id) === i;
      const sameKey = arr.findIndex(
        (x) => x.sender === m.sender && x.createdTime === m.createdTime && x.content === m.content
      ) === i;
      return sameId && sameKey;
    });
    dedup.sort((a, b) => new Date(a.createdTime) - new Date(b.createdTime));
    return dedup;
  }, [chatMessages, liveMessages]);

  // 메시지 갱신 시 항상 하단으로
  useEffect(() => {
    scrollToBottom();
  }, [allMessages]);

  // 이미지 확대 모달
  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <Styled.ChatRoom>
      {/* 상태 표시(개발 편의) */}
      <div style={{ position: 'absolute', top: 8, right: 12, fontSize: 12, opacity: .6 }}>
        WS: {status} | room: {roomName ?? '-'}
      </div>

      <Styled.MessageList>
        {allMessages.map((msg, idx) => {
          const isFirst = idx === 0;
          const prevMsg = allMessages[idx - 1];
          const isNewDay = isFirst || isDifferentDay(msg.createdTime, prevMsg?.createdTime);

          return (
            <div key={msg.id}>
              {isNewDay && <Styled.DateDivider>{formatDate(msg.createdTime)}</Styled.DateDivider>}
              <ChatMessage data={msg} onImageClick={setSelectedImage} />
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </Styled.MessageList>

      {selectedImage && (
        <Styled.ModalOverlay onClick={() => setSelectedImage(null)}>
          <Styled.ModalImage src={selectedImage} alt="확대 이미지" />
        </Styled.ModalOverlay>
      )}

      <ChatInput
        onSend={(msg) => {
          if (msg.type === 'text') {
            // 낙관적 반영 + WS 전송
            sendText(msg.content);
          } else if (msg.type === 'image') {
            // 이미지 프리뷰를 먼저 붙임(업로드 연동 전)
            const previewUrl =
              msg.preview || msg.image || (msg.file ? URL.createObjectURL(msg.file) : null);

            const tempId = `tmp-${Date.now()}`;
            setChatMessages((prev) =>
              prev.concat({
                id: tempId,
                sender: 'me',
                type: 'image',
                content: '',
                image: previewUrl,
                createdTime: new Date().toISOString(),
              })
            );

            // TODO: 업로드 → 업로드된 URL을 WS로 전송
            if (msg.file && previewUrl?.startsWith('blob:')) {
              setTimeout(() => URL.revokeObjectURL(previewUrl), 20_000);
            }
          } else {
            alert('이미지 전송은 업로드 스펙 확정 후 연결할게요!');
          }
        }}
      />
    </Styled.ChatRoom>
  );
};

export default ChatRoom;
