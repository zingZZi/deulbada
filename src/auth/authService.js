// src/auth/authService.js
import api from '../api/api';
import { setTokens, clearTokens, getAccessToken } from './tokenStore';

/**
 * 로그인 (JWT 발급)
 * 사용법 (둘 다 허용):
 *  - login({ email, password })
 *  - login(email, password)
 * 서버 스펙:
 *  - POST http://43.201.70.73/api/token/
 *  - body: { email, password }
 *  - res: { access, refresh }
 */
export async function login(arg1, arg2) {
  // 1) 인자 유연 처리
  let email, password;

  if (typeof arg1 === 'object' && arg1 !== null && !Array.isArray(arg1)) {
    // FormData 방지: 평범한 객체만 허용
    ({ email, password } = arg1);
  } else {
    email = arg1;
    password = arg2;
  }

  // 2) 전처리(트림/정규화)
  email = String(email ?? '').trim().toLowerCase();
  password = String(password ?? '').trim();

  // 3) 테스트용 더미 로그인
  if (email === 'test@example.com' && password === 'password123') {
    const access = 'dummy-access-token';
    const refresh = 'dummy-refresh-token';
    setTokens(access, refresh);
    console.log('[AuthService] Dummy login successful', { access, refresh });
    return { access, refresh };
  }

  // 4) 기본 검증
  if (!email || !password) {
    throw new Error('이메일과 비밀번호는 필수입니다.');
  }

  // 5) 실제 서버 로그인
  const { data } = await api.post('/api/token/', { email, password });
  const { access, refresh } = data || {};
  if (!access || !refresh) throw new Error('토큰 없음');
  setTokens(access, refresh);
  console.log('[AuthService] Login successful', { access, refresh });
  return { access, refresh };
}

/**
 * 토큰 검증
 * 만료되면 로그아웃 처리, 살아있으면 그대로 유지
 */
export async function verifyToken() {
  const token = getAccessToken();
  if (!token) return false;

  try {
    await api.post('/api/token/verify/', { token });
    console.log('[AuthService] Token is valid');
    return true;
  } catch {
    console.warn('[AuthService] Token is invalid or expired');
    clearTokens(); 
    return false;
  }
}

/**
 * 로그아웃 (클라이언트 토큰 제거)
 */
export function logout() {
  console.log('[AuthService] Logging out');
  clearTokens();
}

/**
 * 현재 로그인 상태 확인
 */
export function isLoggedIn() {
  return !!getAccessToken();
}



// 개발환경에서 테스트용
if (typeof window !== 'undefined') {
  window.authTest = {
    login,
    verifyToken,
    logout,
    isLoggedIn
  };
  console.log('[AuthService] window.authTest 등록됨');
}