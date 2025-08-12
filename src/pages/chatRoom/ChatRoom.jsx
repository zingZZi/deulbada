// ChatRoom.jsx
import * as Styled from './ChatRoom.style.js';
import { useState, useEffect, useRef, useMemo } from 'react';
import ChatMessage from './ChatMessage';
import ChatInput from './ChatInput';
import useChatWS from '../../hooks/useChatWS';
import { useParams, useNavigate } from 'react-router-dom';

const BASE_HTTP = 'http://43.201.70.73';

/** 날짜 구분 라벨 포맷터 */
function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString('ko-KR', {
    year: 'numeric', month: 'long', day: 'numeric', weekday: 'short',
  });
}
/** 서로 다른 날짜인지 비교 (날짜 구분선 표시용) */
function isDifferentDay(date1, date2) {
  return new Date(date1).toDateString() !== new Date(date2).toDateString();
}

const ChatRoom = () => {
  /** 과거 메시지(UI 스키마) */
  const [chatMessages, setChatMessages] = useState([]);
  /** 방 기본 정보 */
  const [roomId, setRoomId] = useState(null);
  const [roomName, setRoomName] = useState(null);
  /** 메시지 리스트 맨 아래 스크롤 타겟 */
  const messagesEndRef = useRef(null);

  /** 인증/아이디/파라미터 */
  const token = localStorage.getItem('accessToken');
  const myUserId = Number(localStorage.getItem('userId'));
  const { userId } = useParams();                    // 상대 userId (url 파라미터)
  const navigate = useNavigate();

  /** 하단으로 스크롤 */
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // ---------------------------------------------
  // 1) 방 생성/조회 → roomId, roomName 확보
  //    - 401이면 로그인으로
  //    - room_name이 없으면 상세 재조회로 보완
  // ---------------------------------------------
  useEffect(() => {
    if (!userId || !token) return;

    (async () => {
      try {
        const res = await fetch(`${BASE_HTTP}/chat/chatrooms/`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ partner_id: Number(userId) }),
        });

        const room = await res.json().catch(() => ({}));
        if (!res.ok) {
          if (res.status === 401) {
            // navigate('/login'); // ← 임시 비활성
            console.warn('401 Unauthorized (room create/find) — 리다이렉트 임시 차단');
          }
          console.error('room create/find failed', res.status, room);
          return;
        }

        setRoomId(room.id);
        // 1차: 응답에 room_name/name이 있으면 사용
        if (room.room_name || room.name) {
          setRoomName(room.room_name || room.name);
        } else {
          // 2차: 상세 재조회로 보완 (백엔드에서 안 내려줄 수 있으므로)
          try {
            const r2 = await fetch(`${BASE_HTTP}/chat/chatrooms/${room.id}/`, {
              headers: { Authorization: `Bearer ${token}` },
            });
            const det = await r2.json().catch(() => ({}));
            setRoomName(det.room_name || det.name || String(room.id));
          } catch {
            setRoomName(String(room.id));
          }
        }
      } catch (e) {
        console.error('room create/find failed', e);
      }
    })();
  }, [userId, token, navigate]);

  // ---------------------------------------------
  // 2) 과거 메시지 로드 (REST → UI 스키마 정규화)
  //    - sender가 숫자/객체 두 케이스 모두 대응
  //    - 401이면 로그인으로
  // ---------------------------------------------
  useEffect(() => {
    if (!roomId || !token) return;

    (async () => {
      try {
        const res = await fetch(`${BASE_HTTP}/chat/chatrooms/${roomId}/messages/`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const list = await res.json().catch(() => []);
        if (!res.ok) {
          if (res.status === 401) {
            // navigate('/login'); // ← 임시 비활성
            console.warn('401 Unauthorized (messages list) — 리다이렉트 임시 차단');
          }
          console.error('load messages failed', res.status, list);
          return;
        }

        const normalized = list.map((m) => {
          // sender가 5(숫자) 또는 { id:5, ... }(객체)로 올 수 있으니 통일
          const senderId = typeof m.sender === 'object' ? m.sender?.id : m.sender;
          return {
            id: m.id,
            sender: senderId === myUserId ? 'me' : 'other',
            type: m.image_url ? 'image' : 'text',
            content: m.content || '',
            image: m.image_url || null,
            createdTime: m.created_at,
            // profileImage: m.sender_profile_image ?? null, // 필요 시 사용
          };
        });

        setChatMessages(normalized);
      } catch (e) {
        console.error('load messages failed', e);
      }
    })();
  }, [roomId, token, myUserId, navigate]);

  // ---------------------------------------------
  // 3) 실시간 메시지(WS)
  //    - 훅은 백엔드 키 그대로 제공 → UI 스키마로 변환
  // ---------------------------------------------
  const { status, messages: liveRaw, sendText } =
    useChatWS({ roomName: roomName ?? '', token, withToken: false });

  const liveMessages = useMemo(() => {
    return liveRaw.map((d) => {
      const senderId = typeof d.sender === 'object' ? d.sender?.id : d.sender;
      return {
        id: d.id,
        sender: senderId === myUserId ? 'me' : 'other',
        type: d.image_url ? 'image' : 'text',
        content: d.content || '',
        image: d.image_url || null,
        createdTime: d.created_at,
      };
    });
  }, [liveRaw, myUserId]);

  // ---------------------------------------------
  // 4) 과거 + 실시간 합치기
  //    - 메시지 id 기준 중복 제거
  //    - 시간 오름차순 정렬 (오래된 → 최신)
  // ---------------------------------------------
  const allMessages = useMemo(() => {
    const merged = [...chatMessages, ...liveMessages];
    const dedup = merged.filter((m, i, arr) => arr.findIndex((x) => x.id === m.id) === i);
    dedup.sort((a, b) => new Date(a.createdTime) - new Date(b.createdTime));
    return dedup;
  }, [chatMessages, liveMessages]);

  // 리스트 변화 시 하단으로 스크롤
  useEffect(() => {
    scrollToBottom();
  }, [allMessages]);

  /** 이미지 확대 모달 */
  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <Styled.ChatRoom>
      {/* 연결 상태/방 이름 표시 (개발 편의용) */}
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
            const ok = sendText(msg.content);
            if (!ok) alert('연결 준비 중이에요. 잠시 후 다시 시도해주세요.');
          } else {
            alert('이미지 전송은 업로드 스펙 확정 후 연결할게요!');
          }
        }}
      />
    </Styled.ChatRoom>
  );
};

export default ChatRoom;
