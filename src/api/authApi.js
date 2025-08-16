// src/api/authAPI.js
import api from './api';

/**
 * 일반 사용자 회원가입
 * @param {Object} userData - 회원가입 데이터
 * @param {string} userData.account_id - 계정 ID (영문으로만 구성)
 * @param {string} userData.email - 이메일
 * @param {string} userData.password - 비밀번호
 * @param {string} userData.name - 이름
 * @returns {Promise} 회원가입 결과
 */
export async function registerUser(userData) {
  try {
    const response = await api.post('/api/users/signup/', userData);
    console.log('[AuthAPI] User registration successful', response.data);
    return response.data;
  } catch (error) {
    console.error('[AuthAPI] User registration failed:', error);
    throw error;
  }
}

/**
 * 프로듀서 회원가입
 * @param {Object} userData - 프로듀서 회원가입 데이터
 * @param {string} userData.account_id - 계정 ID (영문으로만 구성)
 * @param {string} userData.username - 닉네임
 * @param {string} userData.email - 이메일
 * @param {string} userData.password - 비밀번호
 * @param {string} userData.ceo_name - 대표자명
 * @param {string} userData.phone - 전화번호
 * @param {string} userData.business_number - 사업자등록번호
 * @param {string} userData.address_postcode - 우편번호
 * @param {string} userData.address_line1 - 주소
 * @returns {Promise} 프로듀서 회원가입 결과
 */
export async function registerProducer(userData) {
  try {
    const response = await api.post('/api/users/signup/producer/', userData);
    console.log('[AuthAPI] Producer registration successful', response.data);
    return response.data;
  } catch (error) {
    console.error('[AuthAPI] Producer registration failed:', error);
    throw error;
  }
}

/**
 * 이메일 중복 확인
 * @param {string} email - 확인할 이메일
 * @returns {Promise<boolean>} true: 사용 가능, false: 이미 사용중
 */
export async function isEmailAvailable(email) {
  try {
    const response = await api.get(`/api/users/check-email/?email=${encodeURIComponent(email)}`);
    const isAvailable = !response.data?.exists; // exists가 false면 사용 가능
    console.log('[AuthAPI] Email check:', email, isAvailable ? 'available' : 'taken');
    return isAvailable;
  } catch (error) {
    console.error('[AuthAPI] Email check failed:', error);
    throw error;
  }
}

/**
 * 계정 ID 중복 확인
 * @param {string} accountId - 확인할 계정 ID
 * @returns {Promise<boolean>} true: 사용 가능, false: 이미 사용중
 */
export async function isAccountIdAvailable(accountId) {
  try {
    const response = await api.get(`/api/users/check-account-id/?account_id=${encodeURIComponent(accountId)}`);
    const isAvailable = !response.data?.exists; // exists가 false면 사용 가능
    console.log('[AuthAPI] Account ID check:', accountId, isAvailable ? 'available' : 'taken');
    return isAvailable;
  } catch (error) {
    console.error('[AuthAPI] Account ID check failed:', error);
    throw error;
  }
}

/**
 * 토큰 검증 (서버 측 검증)
 * @param {string} token - 검증할 토큰
 * @returns {Promise<boolean>} 토큰 유효성
 */
export async function verifyTokenAPI(token) {
  try {
    await api.post('/api/token/verify/', { token });
    console.log('[AuthAPI] Token verification successful');
    return true;
  } catch (error) {
    console.error('[AuthAPI] Token verification failed:', error);
    return false;
  }
}

/**
 * 토큰 갱신 (수동 호출용 - 일반적으로는 api.js에서 자동 처리됨)
 * @param {string} refreshToken - 갱신용 토큰
 * @returns {Promise} 새로운 토큰들
 */
export async function refreshToken(refreshToken) {
  try {
    const response = await api.post('/api/token/refresh/', { refresh: refreshToken });
    console.log('[AuthAPI] Token refresh successful');
    return response.data;
  } catch (error) {
    console.error('[AuthAPI] Token refresh failed:', error);
    throw error;
  }
}

/**
 * 비밀번호 재설정 요청
 * @param {string} email - 비밀번호 재설정할 계정의 이메일
 * @returns {Promise} 재설정 요청 결과
 */
export async function requestPasswordReset(email) {
  try {
    const response = await api.post('/api/users/password-reset/', { email });
    console.log('[AuthAPI] Password reset request sent');
    return response.data;
  } catch (error) {
    console.error('[AuthAPI] Password reset request failed:', error);
    throw error;
  }
}

/**
 * 비밀번호 재설정 확인
 * @param {string} token - 재설정 토큰
 * @param {string} newPassword - 새 비밀번호
 * @returns {Promise} 재설정 결과
 */
export async function confirmPasswordReset(token, newPassword) {
  try {
    const response = await api.post('/api/users/password-reset/confirm/', {
      token,
      password: newPassword
    });
    console.log('[AuthAPI] Password reset successful');
    return response.data;
  } catch (error) {
    console.error('[AuthAPI] Password reset failed:', error);
    throw error;
  }
}

// 개발환경에서 테스트용
if (typeof window !== 'undefined') {
  window.authAPITest = {
    registerUser,
    registerProducer,
    isEmailAvailable,
    isAccountIdAvailable,
    verifyTokenAPI,
    refreshToken,
    requestPasswordReset,
    confirmPasswordReset
  };
  console.log('[AuthAPI] window.authAPITest 등록됨');
}