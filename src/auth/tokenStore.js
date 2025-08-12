// src/auth/tokenStore.js
let memory = { access: null, refresh: null, username: null };

// 앱 시작 시 localStorage에서 토큰과 사용자 정보 복구
if (typeof window !== 'undefined') {
  const savedAccess = localStorage.getItem('access_token');
  const savedRefresh = localStorage.getItem('refresh_token');
  const savedUsername = localStorage.getItem('user_name'); // username 복구
  
  if (savedAccess && savedRefresh) {
    memory.access = savedAccess;
    memory.refresh = savedRefresh;
    memory.username = savedUsername; // 메모리에도 저장
    
    console.log('[tokenStore] 토큰 및 사용자 정보 복구됨:', { 
      access: savedAccess.slice(0, 20) + '...', 
      refresh: savedRefresh.slice(0, 20) + '...',
      username: savedUsername 
    });
  }
}

export function setTokens(access, refresh, username = null) {
  memory.access = access || null;
  memory.refresh = refresh || null;
  memory.username = username || memory.username; // 기존 username 유지하거나 새로 설정
  
  // localStorage에도 저장
  if (typeof window !== 'undefined') {
    if (access) {
      localStorage.setItem('access_token', access);
    } else {
      localStorage.removeItem('access_token');
    }
    
    if (refresh) {
      localStorage.setItem('refresh_token', refresh);
    } else {
      localStorage.removeItem('refresh_token');
    }
    
    if (username) {
      localStorage.setItem('user_name', username);
    } else if (username === null) {
      // null이 명시적으로 전달되면 삭제
      localStorage.removeItem('user_name');
    }
    // username이 undefined면 기존 값 유지
  }
  
  console.log('[tokenStore] setTokens called:', { access, refresh, username });
}

// 별도의 username 설정 함수
export function setUsername(username) {
  memory.username = username;
  
  if (typeof window !== 'undefined') {
    if (username) {
      localStorage.setItem('user_name', username);
    } else {
      localStorage.removeItem('user_name');
    }
  }
  
  console.log('[tokenStore] setUsername called:', username);
}

export function getAccessToken() {
  return memory.access; 
}

export function getRefreshToken() {
  return memory.refresh; 
}

export function getUsername() {
  return memory.username;
}

export function clearTokens() {
  memory = { access: null, refresh: null, username: null };
  
  // localStorage에서도 제거
  if (typeof window !== 'undefined') {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('user_name'); // username도 함께 제거
  }
  
  console.log('[tokenStore] All tokens and user info cleared');
}

export function isAuthenticated() {
  return !!getAccessToken();
}

// 사용자 정보와 함께 인증 여부 확인
export function getUserInfo() {
  return {
    isAuthenticated: !!getAccessToken(),
    username: getUsername(),
    accessToken: getAccessToken()
  };
}

if (typeof window !== 'undefined') {
  window.tokenStoreTest = {
    set: (a, r, u) => setTokens(a, r, u),
    get: () => ({ 
      access: getAccessToken(), 
      refresh: getRefreshToken(),
      username: getUsername() 
    }),
    setUsername: (u) => setUsername(u),
    getUsername: () => getUsername(),
    getUserInfo: () => getUserInfo(),
    clear: () => clearTokens(),
  };
}