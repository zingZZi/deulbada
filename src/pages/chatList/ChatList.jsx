import * as Styled from './ChatList.style.js';
import { useEffect, useState, useMemo, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { getAccessToken } from '../../auth/tokenStore.js';

const BASE_HTTP = 'http://43.201.70.73';

const ChatList = () => {
  const [rooms, setRooms] = useState([]);
  const navigate = useNavigate();
  const token = getAccessToken();
  const myUserId = Number(localStorage.getItem('userId'));
  const location = useLocation();

  const fetchRooms = useCallback(async () => {
    const effectiveUserId = Number(localStorage.getItem('userId'));
    try {
      const res = await fetch(`${BASE_HTTP}/chat/chatrooms/`, {
        headers: { Authorization: `Bearer ${token}` },
        cache: 'no-store',
      });
      if (!res.ok) {
        if (res.status === 401) navigate('/login');
        return [];
      }
    
      const payload = await res.json();
      const list = Array.isArray(payload?.results) ? payload.results
        : Array.isArray(payload) ? payload
        : [];
    
      const normalized = list
        .map((room) => {
          const u1 = room.user1_info;
          const u2 = room.user2_info;
          const meIsU1 = room.user1 === effectiveUserId || u1?.id === effectiveUserId;
          const meIsU2 = room.user2 === effectiveUserId || u2?.id === effectiveUserId;
          if (!meIsU1 && !meIsU2) return null;
        
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
      
        
      
      let next = normalized;
      if (location.state?.removedRoomId) {
        next = next.filter(r => r.roomId !== location.state.removedRoomId);
      }
      setRooms(next);
      return next;
    } catch (e) {
      console.error('load chatrooms failed', e);
      return [];
    }
  }, [token, navigate, location]);

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
      await fetchRooms(); // OK
    })();
  }, [token, myUserId, navigate, fetchRooms]);

  // 최근 대화순 정렬
  const ordered = useMemo(() => {
    return [...rooms].sort((a, b) => {
      const ta = a.lastTime ? +new Date(a.lastTime) : 0;
      const tb = b.lastTime ? +new Date(b.lastTime) : 0;
      return tb - ta;
    });
  }, [rooms]);

  useEffect(() => {
    if (location.state?.refresh) {
      (async () => {
        await fetchRooms();
        window.history.replaceState({}, document.title);
      })();
    }
  }, [location.state, fetchRooms]);

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
