// src/api/authAPI.js
import api from './api';

/**
 * 일반 사용자 회원가입
 */
export async function registerUser(userData) {
  try {
    const response = await api.post('/api/users/signup/', userData);
    return response.data;
  } catch (error) {
    console.error('User registration failed:', error);
    throw error;
  }
}

/**
 * 프로듀서 회원가입
 */
export async function registerProducer(userData) {
  try {
    const response = await api.post('/api/users/signup/producer/', userData);
    return response.data;
  } catch (error) {
    console.error('Producer registration failed:', error);
    throw error;
  }
}

/**
 * 이메일 중복 확인
 * @returns {Promise<boolean>} true: 사용 가능, false: 이미 사용중
 */
export async function isEmailAvailable(email) {
  try {
    const response = await api.get(`/api/users/check-email/?email=${encodeURIComponent(email)}`);
    return !response.data?.exists;
  } catch (error) {
    console.error('Email check failed:', error);
    throw error;
  }
}

/**
 * 계정 ID 중복 확인
 * @returns {Promise<boolean>} true: 사용 가능, false: 이미 사용중
 */
export async function isAccountIdAvailable(accountId) {
  try {
    const response = await api.get(`/api/users/check-account-id/?account_id=${encodeURIComponent(accountId)}`);
    return !response.data?.exists;
  } catch (error) {
    console.error('Account ID check failed:', error);
    throw error;
  }
}

/**
 * 토큰 검증
 */
export async function verifyTokenAPI(token) {
  try {
    await api.post('/api/token/verify/', { token });
    return true;
  } catch (error) {
    console.error('Token verification failed:', error);
    return false;
  }
}

/**
 * 토큰 갱신
 */
export async function refreshToken(refreshToken) {
  try {
    const response = await api.post('/api/token/refresh/', { refresh: refreshToken });
    return response.data;
  } catch (error) {
    console.error('Token refresh failed:', error);
    throw error;
  }
}

/**
 * 비밀번호 재설정 요청
 */
export async function requestPasswordReset(email) {
  try {
    const response = await api.post('/api/users/password-reset/', { email });
    return response.data;
  } catch (error) {
    console.error('Password reset request failed:', error);
    throw error;
  }
}

/**
 * 비밀번호 재설정 확인
 */
export async function confirmPasswordReset(token, newPassword) {
  try {
    const response = await api.post('/api/users/password-reset/confirm/', {
      token,
      password: newPassword
    });
    return response.data;
  } catch (error) {
    console.error('Password reset failed:', error);
    throw error;
  }
}