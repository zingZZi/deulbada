import * as Styled from './ChatRoom.style.js';
import { useState, useEffect, useRef, useMemo } from 'react';
import ChatMessage from './ChatMessage';
import ChatInput from './ChatInput';
import useChatWS from '../../hooks/useChatWS';
import { useParams, useNavigate } from 'react-router-dom';
import { getAccessToken } from '../../auth/tokenStore';
import ActionSheet from '../../components/actionSheet/ActionSheet.jsx';

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
  const [partnerProfileImage, setPartnerProfileImage] = useState(null);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  // 리스트 하단 스크롤용 ref
  const messagesEndRef = useRef(null);

  const wsArrivedRef = useRef(false);
  const wsFallbackTimerRef = useRef(null);

  const lastPendingIdRef = useRef(null);       // 서버가 돌려준 saved.id
  const lastPendingImgRef = useRef(null);

  const tempMessageIdsRef = useRef(new Set());

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

        // 상대방 프로필 이미지 가져오기 (여러 가능한 필드명 체크)
        const partnerProfile = partner?.profile_image || partner?.avatar || partner?.profile_picture || null;
        // 상대경로인 경우 절대경로로 변환
        const absoluteProfileImage = partnerProfile
          ? (partnerProfile.startsWith('http')
              ? partnerProfile
              : `${BASE_HTTP}${partnerProfile.startsWith('/') ? '' : '/'}${partnerProfile}`)
          : null;

        setPartnerProfileImage(absoluteProfileImage);
        
        // 기존 메시지 불러오기
        if (details.messages && Array.isArray(details.messages)) {
          const pastMessages = details.messages.map((msg) => {
            const senderId = typeof msg.sender === 'object' ? msg.sender?.id : msg.sender;
            const isMyMessage = senderId === meId;
            return {
              id: msg.id,
              sender: senderId === meId ? 'me' : 'other',
              type: msg.image_url ? 'image' : 'text',
              content: msg.content || msg.message || '',
              image: msg.image_url || null,
              profileImage: isMyMessage ? null : absoluteProfileImage,
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
  const { status, messages: liveRaw, sendText, sendJson } =
    useChatWS({ roomId, token, withToken: true });

    useEffect(() => {
      if (!liveRaw || !liveRaw.length) return;
      const latest = liveRaw[liveRaw.length - 1];
      
      const sameId = lastPendingIdRef.current && latest?.id === lastPendingIdRef.current;
      const sameImg = lastPendingImgRef.current && latest?.image_url === lastPendingImgRef.current;
      
      if (sameId || sameImg) {
        wsArrivedRef.current = true;
        if (wsFallbackTimerRef.current) {
          clearTimeout(wsFallbackTimerRef.current);
          wsFallbackTimerRef.current = null;
        }

        // 임시 메시지 ID가 있다면 제거 (서버 메시지로 대체됨)
        if (latest.client_id && tempMessageIdsRef.current.has(latest.client_id)) {
          setChatMessages(prev => prev.filter(m => m.id !== latest.client_id));
          tempMessageIdsRef.current.delete(latest.client_id);
        }

        lastPendingIdRef.current = null;
        lastPendingImgRef.current = null;
      }
    }, [liveRaw]);

    useEffect(() => {
      console.log('[ChatRoom] liveRaw 변경됨:', liveRaw);
    }, [liveRaw]);

  const liveMessages = useMemo(() => {
    console.log('[ChatRoom] liveRaw 메시지들:', liveRaw);
    return liveRaw
    .filter(d => {
      // 임시 메시지와 같은 ID면 필터링 (중복 방지)
      return !tempMessageIdsRef.current.has(d.id);
    })
    .map((d) => {
    // 1) 다양한 키 지원 + 공백 제거
    const rawImage =
      d.image_url ?? d.imageUrl ?? d.image ?? d.file_url ?? d.fileUrl ?? null;
    const cleaned = typeof rawImage === 'string' ? rawImage.trim() : null;

    // 2) 상대경로 → 절대경로
    const absoluteImage = cleaned
      ? (cleaned.startsWith('http')
          ? cleaned
          : `${BASE_HTTP}${cleaned.startsWith('/') ? '' : '/'}${cleaned}`)
      : null;

    // 3) 이미지 존재 여부로 type 결정
    const hasImage = Boolean(absoluteImage);

    const isMyMessage = d.sender === myUsername;
    const converted = {
      id: d.id ?? crypto.randomUUID?.() ?? String(Date.now()),
      sender: d.sender === myUsername ? 'me' : 'other',
      type: hasImage ? 'image' : 'text',
      content: (d.content ?? d.message ?? '').trim(),
      image: hasImage ? absoluteImage : null,
      profileImage: isMyMessage ? null : partnerProfileImage,
      createdTime: d.created_at ?? d.createdAt ?? d.timestamp ?? new Date().toISOString(),
    };

    console.log('[ChatRoom] 변환된 메시지:', converted);
    return converted;
  });
  }, [liveRaw, myUsername, partnerProfileImage]);

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


    useEffect(() => {
    console.log('[ChatRoom] allMessages 변경됨:', allMessages);
  }, [allMessages]);
  // 메시지 갱신 시 항상 하단으로
  useEffect(() => {
    scrollToBottom();
  }, [allMessages]);

  useEffect(() => {
    const open = () => setIsSheetOpen(true);
    document.addEventListener('openChatMenu', open);
    return () => document.removeEventListener('openChatMenu', open);
  }, []);

  useEffect(() => {
    return () => {
      if (wsFallbackTimerRef.current) {
        clearTimeout(wsFallbackTimerRef.current);
        wsFallbackTimerRef.current = null;
      }
    };
  }, [roomId]);


  const handleLeaveRoom = async () => {
    if (!window.confirm('채팅방에서 나가시겠어요?')) return;

    try {
      // TODO: 백엔드에 나가기 API가 있으면 여기서 호출
      // await fetch(`${BASE_HTTP}/chat/chatrooms/${roomId}/leave/`, {
      //   method: 'POST',
      //   headers: { Authorization: `Bearer ${token}` },
      // });

      navigate('/chatList'); // UX: 일단 목록으로 이동
    } catch (e) {
      console.error('채팅방 나가기 실패:', e);
      alert('나가기 중 문제가 발생했어요.');
    } finally {
      setIsSheetOpen(false);
    }
  };

  // 이미지 확대 모달
  const [selectedImage, setSelectedImage] = useState(null);

  const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append('image', file);

    const response = await fetch(`${BASE_HTTP}/api/uploads/images/`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      body: formData
    });

    if (!response.ok) {
      throw new Error(`이미지 업로드 실패: ${response.status}`);
    }

    const result = await response.json();
     const imageUrl = result.image;

    if (imageUrl && imageUrl.startsWith('/')) {
      return `${BASE_HTTP}${imageUrl}`;
    }

    return result.image;
  };

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
              <ChatMessage data={msg} onImageClick={setSelectedImage} partnerProfileImage={partnerProfileImage} />
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
        onSend={ async (msg) => {
          if (msg.type === 'text') {
            // 낙관적 반영 + WS 전송
            sendText(msg.content);
          } else if (msg.type === 'image') {
            // 이미지 업로드 및 전송
            const tempId = `tmp-${Date.now()}`;
            const createdAt = new Date().toISOString();
      try {
        const previewUrl = msg.preview || msg.image || (msg.file ? URL.createObjectURL(msg.file) : null);
        
        setChatMessages((prev) =>
          prev.concat({
            id: tempId,
            sender: 'me',
            type: 'image',
            content: '',
            image: previewUrl,
            profileImage: null,
            createdTime: createdAt,
            isUploading: true,
          })
        );

        if (!msg.file) {
          throw new Error('업로드할 파일이 없습니다.');
        }

        const uploadedUrl = await uploadImage(msg.file);

        // 1) 서버에 메시지 생성 요청
        const res = await fetch(`${BASE_HTTP}/chat/chatrooms/${roomId}/messages/`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            content: msg.content && msg.content.trim().length > 0 ? msg.content : '(사진)',
            image_url: uploadedUrl,
          }),
        });
        
        // 2) 응답 바디는 한 번만 읽기 (이전 코드처럼 두 번 읽으면 에러!)
        let saved = null;
        let raw = null;
        try {
          raw = await res.text();                     // 문자열로 먼저 읽고
          saved = raw ? JSON.parse(raw) : null;       // 가능하면 JSON 파싱
        } catch { /* noop */ }
        
        // 3) 에러면 상세를 로그로 남기고 종료
        if (!res.ok) {
          console.error('메시지 생성 실패 상세:', saved ?? raw);
          throw new Error(`메시지 전송 실패: ${res.status}`);
        }
        
        // 4) 성공 → "임시"를 "확정"으로 치환 (삭제 X)
        if (saved) {
          // 서버가 저장된 메시지 정보를 돌려준 경우
          const serverMsg = {
            id: saved.id,
            sender: 'me',
            type: saved.image_url ? 'image' : 'text',
            content: saved.content || '',
            image: saved.image_url || null,
            profileImage: null,
            createdTime: saved.created_at || new Date().toISOString(),
          };
          setChatMessages((prev) => prev.map(m => (m.id === tempId ? serverMsg : m)));

          lastPendingIdRef.current = saved?.id ?? null;
          lastPendingImgRef.current = saved?.image_url ?? null;

          // ★ 폴백 준비: WS가 곧 올 것으로 기대
          wsArrivedRef.current = false;

          // 기존에 걸린 타이머 있으면 정리
          if (wsFallbackTimerRef.current) {
            clearTimeout(wsFallbackTimerRef.current);
            wsFallbackTimerRef.current = null;
          }
        
          // 700ms 동안 WS가 안 오면 프론트가 대신 WS로 한 번 전파
          wsFallbackTimerRef.current = setTimeout(() => {
            if (wsArrivedRef.current) return; // 이미 WS 도착 → 아무 것도 안 함
            // 서버 consumer가 이해하는 포맷에 맞춰 보내세요
            sendJson?.({
              type: 'message',
              id: saved.id,
              room_id: roomId,
              message: saved.content || '(사진)',
              content: saved.content || '(사진)',
              image_url: saved.image_url,
              sender_id: myUserId,
              sender: myUsername,
              created_at: serverMsg.createdTime,
              client_id: tempId, // 있으면 중복 제거에 도움
            });
          }, 700);
        
        } else {
          // 혹시 응답 바디가 비어 있다면, 최소한 이미지 URL만 확정해 치환
          setChatMessages((prev) =>
            prev.map(m => (m.id === tempId ? { ...m, image: uploadedUrl, isUploading: false } : m))
          );
        }
        
        // 5) blob URL 정리
        if (previewUrl?.startsWith('blob:')) {
          URL.revokeObjectURL(previewUrl);
        }

      } catch (error) {
        console.error('이미지 전송 실패:', error);
        alert(`이미지 전송에 실패했습니다: ${error.message}`);
        
        // 실패 시 임시 메시지 제거
        setChatMessages((prev) => prev.filter(m => m.id !== tempId));
      }
    }
  }}
/>

{isSheetOpen && (
  <ActionSheet
    setIsPopupOpen={setIsSheetOpen}
    list={[
      { label: '채팅방 나가기', action: handleLeaveRoom },
    ]}
  />
)}

    </Styled.ChatRoom>
  );
};

export default ChatRoom;
