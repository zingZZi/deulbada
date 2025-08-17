// src/auth/tokenStore.js

let memory = { access: null, refresh: null, accountId: null };

// 앱 시작 시 localStorage에서 토큰과 사용자 정보 복구
if (typeof window !== 'undefined') {
  const savedAccess = localStorage.getItem('access_token');
  const savedRefresh = localStorage.getItem('refresh_token');
  const savedAccountId = localStorage.getItem('account_id');
  
  if (savedAccess && savedRefresh) {
    memory.access = savedAccess;
    memory.refresh = savedRefresh;
    memory.accountId = savedAccountId;
  }
}

export function setTokens(access, refresh, accountId = null) {
  memory.access = access || null;
  memory.refresh = refresh || null;
  memory.accountId = accountId || memory.accountId;
  
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
    
    if (accountId) {
      localStorage.setItem('account_id', accountId);
    } else if (accountId === null) {
      localStorage.removeItem('account_id');
    }
  }
}

export function setAccountId(accountId) {
  memory.accountId = accountId;
  
  if (typeof window !== 'undefined') {
    if (accountId) {
      localStorage.setItem('account_id', accountId);
    } else {
      localStorage.removeItem('account_id');
    }
  }
}

export function getAccessToken() {
  return memory.access; 
}

export function getRefreshToken() {
  return memory.refresh; 
}

export function getAccountId() {
  return memory.accountId;
}

export function clearTokens() {
  memory = { access: null, refresh: null, accountId: null };
  
  if (typeof window !== 'undefined') {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('account_id');
  }
}

export function isAuthenticated() {
  return !!getAccessToken();
}

export function getUserInfo() {
  return {
    isAuthenticated: !!getAccessToken(),
    accountId: getAccountId(),
    accessToken: getAccessToken()
  };
}