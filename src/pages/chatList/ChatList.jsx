import * as Styled from './ChatList.style.js';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const BASE_HTTP = 'http://43.201.70.73';

const ChatList = () => {
  const [rooms, setRooms] = useState([]);
  const navigate = useNavigate();
  const token = localStorage.getItem('accessToken');
  const myUserId = Number(localStorage.getItem('userId'));

  useEffect(() => {
    if (!token) { navigate('/login'); return; }
    (async () => {
      try {
        const res = await fetch(`${BASE_HTTP}/chat/chatrooms/`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) {
          if (res.status === 401) navigate('/login');
          return;
        }
        const data = await res.json();

        // 예시 매핑: 서버 스키마에 맞게 조정
        // room.participants: [ {id, username, profile_image}, ... ]
        // room.last_message: { content, created_at }
        const normalized = data.map((room) => {
          const participants = room.participants || room.members || [];
          const partner = participants.find(p => (p.id ?? p.user_id) !== myUserId) || {};
          const partnerId = partner.id ?? partner.user_id;
          return {
            roomId: room.id,
            roomName: room.room_name || room.name || String(room.id),
            partnerId,
            partnerName: partner.username || partner.account_id || '알 수 없는 사용자',
            partnerImage: partner.profile_image || partner.avatar_url || '',
            lastMessage: room.last_message?.content || '',
            lastTime: room.last_message?.created_at || room.updated_at || room.created_at,
          };
        });

        setRooms(normalized);
      } catch (e) {
        console.error('load chatrooms failed', e);
      }
    })();
  }, [token, myUserId, navigate]);

  return (
    <Styled.ChatList>
      {rooms.map((r) => (
        <Styled.ChatItem
          key={r.roomId}
          onClick={() => navigate(`/chatRoom/${r.partnerId}`)}
          role="button"
          tabIndex={0}
        >
          <Styled.ProfileWrapper>
            <Styled.ProfileImg src={r.partnerImage || '/fallback.png'} alt={r.partnerName} />
            {/* online 여부는 별도 필드 있으면 표시 */}
          </Styled.ProfileWrapper>

          <Styled.TextBox>
            <Styled.Name>{r.partnerName}</Styled.Name>
            <Styled.LastMessage>{r.lastMessage}</Styled.LastMessage>
          </Styled.TextBox>

          <Styled.Date>{r.lastTime ? new Date(r.lastTime).toLocaleDateString() : ''}</Styled.Date>
        </Styled.ChatItem>
      ))}
    </Styled.ChatList>
  );
};

export default ChatList;
