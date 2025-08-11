import * as Styled from './ChatRoom.style.js';
import { useState, useEffect, useRef } from 'react';
import ChatMessage from './ChatMessage';
import ChatInput from './ChatInput';
import useChatWS from '../../hooks/useChatWS';
import { useParams, useNavigate, useLocation, useSearchParams } from 'react-router-dom';

const BASE_HTTP = 'http://43.201.70.73';

function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString('ko-KR', {
    year: 'numeric', month: 'long', day: 'numeric', weekday: 'short',
  });
}
function isDifferentDay(date1, date2) {
  return new Date(date1).toDateString() !== new Date(date2).toDateString();
}

const ChatRoom = () => {
  const [chatMessages, setChatMessages] = useState([]);
  const [roomId, setRoomId] = useState(null);
  const [roomName, setRoomName] = useState(null);
  const messagesEndRef = useRef(null);

  const navigate = useNavigate();
  const { userId: paramUserId } = useParams();          // /chatRoom/:userId
  const [sp] = useSearchParams();                       // (옵션) ?userId=8 대비
  const { state } = useLocation();                      // (옵션) state.userId 대비
  const resolvedUserId = Number(paramUserId ?? state?.userId ?? sp.get('userId'));

  const token = localStorage.getItem('accessToken');
  const myUserId = Number(localStorage.getItem('userId'));

  const scrollToBottom = () => messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });

  // 가드: 토큰/상대ID 없으면 리다이렉트
  useEffect(() => {
    if (!token) navigate('/login');
    else if (!Number.isFinite(resolvedUserId)) navigate('/chatList');
  }, [token, resolvedUserId, navigate]);

  // 1) 방 생성/조회 → roomId, roomName 확보
  useEffect(() => {
    if (!Number.isFinite(resolvedUserId) || !token) return;
    (async () => {
      try {
        const res = await fetch(`${BASE_HTTP}/chat/chatrooms/`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ partner_id: resolvedUserId }),
        });
        if (!res.ok) {
          const err = await res.json().catch(() => ({}));
          console.error('room create/find failed', res.status, err);
          if (res.status === 401) navigate('/login');
          return;
        }
        const room = await res.json();
        setRoomId(room.id);
        setRoomName(room.room_name || room.name || String(room.id));
      } catch (e) {
        console.error('room create/find failed', e);
      }
    })();
  }, [resolvedUserId, token, navigate]);

  // 2) 과거 메시지 로드 (REST → UI 스키마로 정규화)
  useEffect(() => {
    if (!roomId || !token) return;
    (async () => {
      try {
        const res = await fetch(`${BASE_HTTP}/chat/chatrooms/${roomId}/messages/`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) {
          const err = await res.json().catch(() => ({}));
          console.error('load messages failed', res.status, err);
          if (res.status === 401) navigate('/login');
          return;
        }
        const list = await res.json();
        const normalized = list.map((m) => {
          const senderId = typeof m.sender === 'object' ? m.sender?.id : m.sender; // 객체/숫자 모두 대응
          return {
            id: m.id,
            sender: senderId === myUserId ? 'me' : 'other',
            type: m.image_url ? 'image' : 'text',
            content: m.content || '',
            image: m.image_url || null,
            createdTime: m.created_at || m.createdAt,
          };
        });
        setChatMessages(normalized);
      } catch (e) {
        console.error('load messages failed', e);
      }
    })();
  }, [roomId, token, myUserId, navigate]);

  // 3) 실시간 메시지(WS) — roomName 있을 때만 연결
  const { status, messages: liveRaw, sendText } =
    useChatWS({ roomName: roomName ?? '', token, withToken: false });

  const liveMessages = liveRaw.map((d) => {
    const senderId = typeof d.sender === 'object' ? d.sender?.id : d.sender;
    return {
      id: d.id,
      sender: senderId === myUserId ? 'me' : 'other',
      type: d.image_url ? 'image' : 'text',
      content: d.content || '',
      image: d.image_url || null,
      createdTime: d.created_at || d.createdAt,
    };
  });

  // 4) 과거 + 실시간 합치기 (중복 제거 + 시간 정렬)
  const merged = [...chatMessages, ...liveMessages];
  const dedup = merged.filter((m, i, arr) => arr.findIndex(x => x.id === m.id) === i);
  dedup.sort((a, b) => new Date(a.createdTime) - new Date(b.createdTime));
  const allMessages = dedup;

  // 스크롤 유지
  useEffect(() => { scrollToBottom(); }, [allMessages]);

  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <Styled.ChatRoom>
      {/* 임시 상태표시 */}
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
