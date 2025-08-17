// src/auth/authService.js
import api from '../api/api';
import { setTokens, clearTokens, getAccessToken, setAccountId } from './tokenStore';

/**
 * 로그인
 */
export async function login(email, password) {
  // 입력값 정규화
  email = String(email ?? '').trim().toLowerCase();
  password = String(password ?? '').trim();

  // 기본 검증
  if (!email || !password) {
    throw new Error('이메일과 비밀번호는 필수입니다.');
  }

  try {
    const { data } = await api.post('/api/users/login/', { email, password });

    const { access, refresh } = data;
    if (!access || !refresh) {
      throw new Error('토큰이 없습니다.');
    }

    const accountId = data?.account_id ?? data?.user?.account_id;
    setTokens(access, refresh, accountId);

    return {
      access,
      refresh,
      user: { 
        ...data.user, 
        account_id: accountId, 
        user_id: data?.user_id, 
        email: data?.email 
      },
      message: data?.message,
    };
  } catch (error) {
    console.error('Login failed:', error);
    throw error;
  }
}

/**
 * 사용자 정보 업데이트
 */
export function updateUserInfo(userInfo) {
  const accountId = userInfo?.account_id || userInfo?.user_id;
  if (accountId) {
    setAccountId(accountId);
  }
}

/**
 * 토큰 검증
 */
export async function verifyToken() {
  const token = getAccessToken();
  if (!token) return false;

  try {
    await api.post('/api/token/verify/', { token });
    return true;
  } catch {
    clearTokens(); 
    return false;
  }
}

/**
 * 로그아웃
 */
export function logout() {
  clearTokens(); 
  localStorage.removeItem('userId');
  localStorage.removeItem('username');
}

/**
 * 현재 로그인 상태 확인
 */
export function isLoggedIn() {
  return !!getAccessToken();
}