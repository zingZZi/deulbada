import * as Styled from './ChatList.style.js';
import { useEffect, useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAccessToken } from '../../auth/tokenStore.js';

const BASE_HTTP = 'http://43.201.70.73';

const ChatList = () => {
  const [rooms, setRooms] = useState([]);
  const navigate = useNavigate();
  const token = getAccessToken();
  const myUserId = Number(localStorage.getItem('userId'));

  useEffect(() => {
    if (!token) { 
      navigate('/login');
      return;
    }

    // 내 userId 보장 (없으면 /mypage 로딩 후 저장)
    const ensureUserId = async () => {
      if (!myUserId) {
        const res = await fetch(`${BASE_HTTP}/api/users/mypage/`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.ok) {
          const me = await res.json();
          if (me?.id) localStorage.setItem('userId', String(me.id));
        }
      }
    };

    (async () => {
      await ensureUserId();

      const effectiveUserId = Number(localStorage.getItem('userId'));

      try {
        // 채팅방 목록 불러오기
        const res = await fetch(`${BASE_HTTP}/chat/chatrooms/`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) {
          if (res.status === 401) navigate('/login');
          return;
        }

        const payload = await res.json();
        const list = Array.isArray(payload?.results) ? payload.results
          : Array.isArray(payload) ? payload
          : [];

        // 백엔드 데이터 → UI 전용 스키마 변환
        const normalized = list
          .map((room) => {
            const u1 = room.user1_info;
            const u2 = room.user2_info;
            const meIsU1 = room.user1 === effectiveUserId || u1?.id === effectiveUserId;
            const meIsU2 = room.user2 === effectiveUserId || u2?.id === effectiveUserId;
            if (!meIsU1 && !meIsU2) return null; // 내가 속한 방만

            const partner = meIsU1 ? u2 : u1;
            const msgs = Array.isArray(room.messages) ? room.messages : [];
            const last = msgs.length ? msgs[msgs.length - 1] : null;

            return {
              roomId: room.id,
              roomName: room.room_name || room.name || String(room.id),
              partnerId: partner?.id,
              partnerName: partner?.username || partner?.account_id || '알 수 없는 사용자',
              partnerImage: partner?.profile_image || partner?.avatar_url || '',
              lastMessage: last?.content || '',
              lastTime: last?.created_at || room.created_at,
            };
          })
          .filter(r => r && !!r.partnerId);

        setRooms(normalized);
      } catch (e) {
        console.error('load chatrooms failed', e);
      }
    })();
  }, [token, myUserId, navigate]);

  // 최근 대화순 정렬
  const ordered = useMemo(() => {
    return [...rooms].sort((a, b) => {
      const ta = a.lastTime ? +new Date(a.lastTime) : 0;
      const tb = b.lastTime ? +new Date(b.lastTime) : 0;
      return tb - ta;
    });
  }, [rooms]);

  return (
    <Styled.ChatList>
      {ordered.map((r) => (
        <Styled.ChatItem
          key={r.roomId}
          onClick={() =>
            navigate(`/chatRoom/${r.roomId}`, {
              state: { headerTitle: r.partnerName }
            })
          }
          role="button"
          tabIndex={0}
        >
          <Styled.ProfileWrapper>
            <Styled.ProfileImg src={r.partnerImage || '/fallback.png'} alt={r.partnerName} />
          </Styled.ProfileWrapper>

          <Styled.TextBox>
            <Styled.Name>{r.partnerName}</Styled.Name>
            <Styled.LastMessage>{r.lastMessage}</Styled.LastMessage>
          </Styled.TextBox>

          <Styled.Date>
            {r.lastTime ? new Date(r.lastTime).toLocaleDateString('ko-KR') : ''}
          </Styled.Date>
        </Styled.ChatItem>
      ))}
    </Styled.ChatList>
  );
};

export default ChatList;
