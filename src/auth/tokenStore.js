// src/auth/tokenStore.js
let memory = { access: null, refresh: null };

// 앱 시작 시 localStorage에서 토큰 복구
if (typeof window !== 'undefined') {
  const savedAccess = localStorage.getItem('access_token');
  const savedRefresh = localStorage.getItem('refresh_token');
  if (savedAccess && savedRefresh) {
    memory.access = savedAccess;
    memory.refresh = savedRefresh;
    console.log('[tokenStore] 토큰 복구됨:', { access: savedAccess.slice(0, 20) + '...', refresh: savedRefresh.slice(0, 20) + '...' });
  }
}

export function setTokens(access, refresh) {
  memory.access = access || null;
  memory.refresh = refresh || null;
  
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
  }
  
  console.log('[tokenStore] setTokens called:', { access, refresh });
}

export function getAccessToken() {
  return memory.access; 
}

export function getRefreshToken() {
  return memory.refresh; 
}

export function clearTokens() {
  memory = { access: null, refresh: null };
  
  // localStorage에서도 제거
  if (typeof window !== 'undefined') {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
  }
}

export function isAuthenticated() {
  return !!getAccessToken();
}

if (typeof window !== 'undefined') {
  window.tokenStoreTest = {
    set: (a, r) => setTokens(a, r),
    get: () => ({ access: getAccessToken(), refresh: getRefreshToken() }),
    clear: () => clearTokens(),
  };
}