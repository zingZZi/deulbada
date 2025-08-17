import * as Styled from './ChatList.style.js';
import { useEffect, useState, useMemo, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { getAccessToken } from '../../auth/tokenStore.js';

const BASE_HTTP = 'https://deulbada.duckdns.org';

const ChatList = () => {
  const [rooms, setRooms] = useState([]);
  const navigate = useNavigate();
  const token = getAccessToken();
  const myUserId = Number(localStorage.getItem('userId'));
  const location = useLocation();

  const fetchRooms = useCallback(async () => {
  const effectiveUserId = Number(localStorage.getItem('userId'));
  try {
    const timestamp = new Date().getTime();
    let allRooms = [];
    let nextUrl = `${BASE_HTTP}/chat/chatrooms/?t=${timestamp}`;
    
    // 모든 페이지의 데이터를 가져오기
    while (nextUrl) {
      const res = await fetch(nextUrl, {
        headers: { 
          Authorization: `Bearer ${token}`
        },
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
      
      allRooms = [...allRooms, ...list];
      nextUrl = payload.next; // 다음 페이지 URL
    }

    const normalized = allRooms
      .map((room) => {
        const u1 = room.user1_info;
        const u2 = room.user2_info;
      
        const meIsU1 = room.user1 === effectiveUserId || u1?.id === effectiveUserId;
        const meIsU2 = room.user2 === effectiveUserId || u2?.id === effectiveUserId;
        if (!meIsU1 && !meIsU2) return null;
      
        const partnerRaw = meIsU1 ? (u2 ?? {}) : (u1 ?? {});
        const partnerId   = partnerRaw.id ?? (meIsU1 ? room.user2 : room.user1);
        const partnerName = partnerRaw.username || partnerRaw.account_id || `사용자 ${partnerId ?? ''}`;
        const partnerImage = partnerRaw.profile_image || partnerRaw.avatar_url || '';
      
        const msgs = Array.isArray(room.messages) ? room.messages : [];
        const last = msgs.length ? msgs[msgs.length - 1] : null;
      
        return {
          roomId: room.id,
          roomName: room.room_name || room.name || String(room.id),
          partnerId,
          partnerName,
          partnerImage,
          lastMessage: last?.content || '',
          lastTime: last?.created_at || room.created_at,
        };
      })
      .filter(r => r !== null);
    
    // 디버깅용 콘솔 추가
    console.log('=== fetchRooms 디버깅 ===');
    console.log('전체 가져온 방 개수:', allRooms.length);
    console.log('내가 속한 방 개수:', normalized.length);
    console.log('========================');
    
    setRooms(normalized);
    return normalized;
  } catch (e) {
    console.error('load chatrooms failed', e);
    return [];
  }
}, [token, navigate]);



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

  // location.state 변화 감지하여 적절한 액션 수행
  useEffect(() => {
    const handleLocationState = async () => {
      const { refresh, removedRoomId } = location.state || {};

      if (removedRoomId) {
        // 제거된 방만 로컬 상태에서 먼저 제거
        setRooms(prev => prev.filter(r => r.roomId !== removedRoomId));

        // 그 후 전체 목록을 다시 불러와서 최신 상태로 동기화
        setTimeout(async () => {
          await fetchRooms();
        }, 500); // 서버 상태 반영을 위한 약간의 지연
      }

      if (refresh) {
        // 새로운 채팅방 생성 등으로 인한 새로고침
        await fetchRooms();
      }

      // state 정리
      if (refresh || removedRoomId) {
        window.history.replaceState({}, document.title);
      }
    };

    handleLocationState();
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
