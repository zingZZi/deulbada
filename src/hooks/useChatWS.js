// src/hooks/useChatWS.js
import { useEffect, useRef, useState, useCallback } from 'react';

const HOST = '43.201.70.73'; // 공통 HOST만 상수로 두고
const wsScheme = typeof window !== 'undefined' && window.location.protocol === 'https:' ? 'wss' : 'ws';

export default function useChatWS({ roomName, token, withToken = false, useSubprotocol = false }) {
  const [messages, setMessages] = useState([]);
  const [status, setStatus] = useState('idle'); // idle | connecting | open | closed | error
  const wsRef = useRef(null);
  const retryCount = useRef(0);
  const reconnectTimer = useRef(null);
  const shouldReconnect = useRef(true);   // 수동 종료/언마운트 시 재연결 금지
  const openedOnce = useRef(false);       // StrictMode 중복 연결 방지

  // URL 조립
  const qs = withToken && token ? `?token=${encodeURIComponent(token)}` : '';
  const wsUrl = `${wsScheme}://${HOST}/ws/chat/${encodeURIComponent(roomName)}/${qs}`;

  // 방 바뀌면 메시지 초기화
  useEffect(() => {
    setMessages([]);
  }, [roomName]);

  const scheduleReconnect = useCallback(() => {
    if (!shouldReconnect.current) return;
    const delay = Math.min(1000 * 2 ** retryCount.current, 8000);
    reconnectTimer.current = setTimeout(() => connect(), delay);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const connect = useCallback(() => {
    if (!roomName) return;
    if (openedOnce.current && wsRef.current) return; // StrictMode 2회 방지
    openedOnce.current = true;

    setStatus('connecting');

    // Subprotocol로 토큰 전달이 필요하면 이렇게
    const protocols = useSubprotocol && token ? [token] : undefined;
    const ws = new WebSocket(wsUrl, protocols);
    wsRef.current = ws;

    ws.onopen = () => {
      setStatus('open');
      retryCount.current = 0;
    };

    ws.onmessage = (e) => {
      try {
        const d = JSON.parse(e.data);
        const msg = {
          id: d.id ?? (self.crypto?.randomUUID?.() || `${Date.now()}-${Math.random()}`),
          sender: d.sender,
          sender_username: d.sender_username ?? null,
          content: d.content ?? '',
          image_url: d.image_url ?? null,
          is_read: d.is_read ?? false,
          created_at: d.created_at || new Date().toISOString(),
        };
        setMessages((prev) => prev.concat(msg));
      } catch (err) {
        console.error('WS parse error:', err);
      }
    };

    ws.onerror = () => setStatus('error');

    ws.onclose = (ev) => {
      setStatus('closed');
      wsRef.current = null;
      openedOnce.current = false;
      // 정상 종료(1000) or 수동 종료면 재연결 X
      if (ev.code === 1000 || !shouldReconnect.current) return;
      retryCount.current += 1;
      scheduleReconnect();
    };
  }, [roomName, wsUrl, token, useSubprotocol, scheduleReconnect]);

  useEffect(() => {
    if (!roomName) return;
    shouldReconnect.current = true;
    connect();
    return () => {
      // 언마운트/방 변경 시 재연결 금지 및 타이머 해제
      shouldReconnect.current = false;
      if (reconnectTimer.current) clearTimeout(reconnectTimer.current);
      wsRef.current?.close(1000, 'leave');
      wsRef.current = null;
      openedOnce.current = false;
    };
  }, [connect, roomName]);

  const sendText = useCallback((content) => {
    const ws = wsRef.current;
    if (!ws || ws.readyState !== WebSocket.OPEN) return false;
    // 필요 시 type 필드 등 백엔드 스펙 맞추기
    ws.send(JSON.stringify({ content }));
    return true;
  }, []);

  const sendImage = useCallback((imageUrl) => {
    const ws = wsRef.current;
    if (!ws || ws.readyState !== WebSocket.OPEN) return false;
    ws.send(JSON.stringify({ image_url: imageUrl }));
    return true;
  }, []);

  const close = useCallback(() => {
    shouldReconnect.current = false;
    if (reconnectTimer.current) clearTimeout(reconnectTimer.current);
    wsRef.current?.close(1000, 'manual-close');
    wsRef.current = null;
    openedOnce.current = false;
  }, []);

  return {
    status,
    messages,
    sendText,
    sendImage,
    setMessages, // 필요 시 외부에서 합치기/정렬
    close,
    // BASE 주소는 별도 config에서 import 권장 (hook가 네트워킹 상수 노출 X)
  };
}
