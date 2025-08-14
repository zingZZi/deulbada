import { useEffect, useRef, useState, useCallback } from 'react';

const HOST = '43.201.70.73';
const wsScheme =
  typeof window !== 'undefined' && window.location.protocol === 'https:' ? 'wss' : 'ws';

/**
 * WebSocket 기반 채팅 훅
 * - roomId 또는 roomName으로 연결
 * - withToken=true → URL 쿼리에 토큰 포함
 * - useSubprotocol=true → subprotocol로 토큰 전송
 */
export default function useChatWS({
  roomId,               // 채팅방 ID
  roomName,             // 채팅방 이름
  token,                // 인증 토큰
  withToken = false,    // URL에 토큰 포함 여부
  useSubprotocol = false, // Subprotocol로 토큰 전달 여부
}) {
  const [messages, setMessages] = useState([]);
  const [status, setStatus] = useState('idle'); // idle | connecting | open | closed | error
  const wsRef = useRef(null);           // 현재 WebSocket 인스턴스
  const retryCount = useRef(0);         // 재연결 시도 횟수
  const reconnectTimer = useRef(null);  // 재연결 타이머
  const shouldReconnect = useRef(true); // 재연결 여부
  const openedOnce = useRef(false);     // 중복 연결 방지 플래그

  const makeAbsoluteUrl = useCallback((url) => {
  if (!url) return null;
  if (url.startsWith('http')) return url; // 이미 절대경로
  if (url.startsWith('//')) return `https:${url}`;
  if (url.startsWith('/')) return `https://${HOST}${url}`; // 상대경로 → 절대경로
  return `https://${HOST}/${url}`;
}, []);

  // WebSocket URL 만들기
  const qs = withToken && token ? `?token=${encodeURIComponent(token)}` : '';
  const path =
    roomId != null
      ? `/ws/chat/${roomId}/`
      : roomName
      ? `/ws/chat/${encodeURIComponent(roomName)}/`
      : null;
  const wsUrl = path ? `${wsScheme}://${HOST}${path}${qs}` : null;

  // 방 변경 시 메시지 초기화
  useEffect(() => {
    setMessages([]);
  }, [roomId, roomName]);

  // 재연결 예약
  const scheduleReconnect = useCallback(() => {
    if (!shouldReconnect.current) return;
    const delay = Math.min(1000 * 2 ** retryCount.current, 8000); // 점점 늘리되 최대 8초
    reconnectTimer.current = setTimeout(() => connect(), delay);
  }, []);

  // WebSocket 연결
  const connect = useCallback(() => {
    if (!wsUrl) return;                              // URL이 없으면 연결 안 함
    if (openedOnce.current && wsRef.current) return; // 이미 연결했으면 중단
    openedOnce.current = true;

    setStatus('connecting');
    const protocols = useSubprotocol && token ? [token] : undefined;
    const ws = new WebSocket(wsUrl, protocols);
    wsRef.current = ws;

    console.log('[WS] connect to:', wsUrl, 'protocols:', protocols);

    ws.onopen = () => {
      setStatus('open');
      retryCount.current = 0;
      console.log('[WS] onopen');
    };

    // 서버 → 클라이언트 메시지 수신
    ws.onmessage = (e) => {
      console.log('[WS] RAW 데이터:', e.data);
      try {
        const d = JSON.parse(e.data);
        console.log('[WS] 받은 메시지:', d);
        console.log('[WS] 이미지 URL:', d.image_url);
        console.log('[WS] 발신자:', d.sender);
        setMessages((prev) =>
          prev.concat({
            id: d.id ?? (self.crypto?.randomUUID?.() || `${Date.now()}-${Math.random()}`),
            sender: d.sender,
            sender_username: d.sender_username ?? null,
            content: d.message ?? d.content ?? '',
            image_url: d.image_url ? makeAbsoluteUrl(d.image_url) : null,
            is_read: d.is_read ?? false,
            created_at: d.created_at || new Date().toISOString(),
          })
        );
      } catch (err) {
        console.error('WS parse error:', err);
      }
    };

    ws.onerror = () => setStatus('error');

    // 연결 종료 시
    ws.onclose = (ev) => {
      setStatus('closed');
      wsRef.current = null;
      openedOnce.current = false;
      console.log('[WS] onclose:', ev.code, ev.reason);

      // 정상 종료(1000) 또는 수동 종료면 재연결 안 함
      if (ev.code === 1000 || !shouldReconnect.current) return;

      retryCount.current += 1;
      scheduleReconnect();
    };
  }, [wsUrl, token, useSubprotocol, scheduleReconnect, makeAbsoluteUrl]);

  // 최초 연결 & 언마운트 시 정리
  useEffect(() => {
    if (!wsUrl) return;
    shouldReconnect.current = true;
    connect();

    return () => {
      shouldReconnect.current = false;
      if (reconnectTimer.current) clearTimeout(reconnectTimer.current);
      wsRef.current?.close(1000, 'leave');
      wsRef.current = null;
      openedOnce.current = false;
    };
  }, [connect, wsUrl]);

  // 텍스트 전송
  const sendText = useCallback((content) => {
    const ws = wsRef.current;
    if (!ws || ws.readyState !== WebSocket.OPEN) return false;
    ws.send(JSON.stringify({ message: content }));
    return true;
  }, []);

  // 이미지 전송
  const sendImage = useCallback((imageUrl) => {
    const ws = wsRef.current;
    if (!ws || ws.readyState !== WebSocket.OPEN) return false;
    ws.send(JSON.stringify({ image_url: imageUrl }));
    return true;
  }, []);

  // 연결 종료 (재연결 X)
  const close = useCallback(() => {
    shouldReconnect.current = false;
    if (reconnectTimer.current) clearTimeout(reconnectTimer.current);
    wsRef.current?.close(1000, 'manual-close');
    wsRef.current = null;
    openedOnce.current = false;
  }, []);

  return { status, messages, sendText, sendImage, setMessages, close };
}
