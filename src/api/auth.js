// src/api/auth.js
import api from './api'; // ✅ api.js의 default export
import { setTokens } from '../auth/tokenStore'; // ✅ api.js가 사용하는 저장소와 동일한 유틸

export const login = async (account_id, password) => {
  try {
    // 1) 로그인 요청: 프로토콜/호스트를 api 인스턴스와 통일(상대경로 사용)
    // 백엔드가 username도 요구한다면 주석 해제해서 함께 전송
    const { data } = await api.post('/api/token/', {
      account_id,
      // username: account_id, // <- 서버 스펙이 요구하면 사용
      password,
    });

    const { access, refresh } = data || {};
    if (!access || !refresh) {
      throw new Error('로그인 응답에 토큰이 없습니다.');
    }

    // 2) 토큰 저장: localStorage 직접 접근 X, tokenStore로 저장(인터셉터와 호환)
    setTokens(access, refresh);

    // 3) 로그인 후 내 정보 가져오기(선택)
    const me = await api.get('/api/user/me');
    return me.data;
  } catch (err) {
    console.error('로그인 실패 또는 사용자 정보 조회 실패:', err);
    throw err;
  }
};