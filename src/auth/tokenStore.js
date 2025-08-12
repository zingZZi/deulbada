// src/auth/tokenStore.js

let memory = { access: null, refresh: null, accountId: null };

// 앱 시작 시 localStorage에서 토큰과 사용자 정보 복구
if (typeof window !== 'undefined') {
  const savedAccess = localStorage.getItem('access_token');
  const savedRefresh = localStorage.getItem('refresh_token');
  const savedAccountId = localStorage.getItem('account_id'); // account_id 키로 복구
  
  if (savedAccess && savedRefresh) {
    memory.access = savedAccess;
    memory.refresh = savedRefresh;
    memory.accountId = savedAccountId; // 메모리에도 저장
    
    console.log('[tokenStore] 토큰 및 사용자 정보 복구됨:', { 
      access: savedAccess.slice(0, 20) + '...', 
      refresh: savedRefresh.slice(0, 20) + '...',
      accountId: savedAccountId 
    });
  }
}

export function setTokens(access, refresh, accountId = null) {
  memory.access = access || null;
  memory.refresh = refresh || null;
  memory.accountId = accountId || memory.accountId; // account_id 저장
  
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

    
    if (accountId) {
      localStorage.setItem('account_id', accountId); // account_id 키로 저장
    } else if (accountId === null) {
      // null이 명시적으로 전달되면 삭제
      localStorage.removeItem('account_id');
    }
    // accountId가 undefined면 기존 값 유지
  }
  
  console.log('[tokenStore] setTokens called:', { access, refresh, accountId });
}

// 별도의 account_id 설정 함수
export function setAccountId(accountId) {
  memory.accountId = accountId; // account_id 저장
  
  if (typeof window !== 'undefined') {
    if (accountId) {
      localStorage.setItem('account_id', accountId); // account_id 키로 저장
    } else {
      localStorage.removeItem('account_id');
    }
  }
  
  console.log('[tokenStore] setAccountId called:', accountId);

}

export function getAccessToken() {
  return memory.access; 
}

export function getRefreshToken() {
  return memory.refresh; 
}


export function getAccountId() {
  return memory.accountId; // account_id를 반환
}

export function clearTokens() {
  memory = { access: null, refresh: null, accountId: null };

  
  // localStorage에서도 제거
  if (typeof window !== 'undefined') {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('account_id'); // account_id도 함께 제거
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
    accountId: getAccountId(), // account_id 반환
    accessToken: getAccessToken()
  };
}

if (typeof window !== 'undefined') {
  window.tokenStoreTest = {
    set: (a, r, accountId) => setTokens(a, r, accountId),
    get: () => ({ 
      access: getAccessToken(), 
      refresh: getRefreshToken(),
      accountId: getAccountId() // account_id 반환
    }),
    setAccountId: (id) => setAccountId(id),
    getAccountId: () => getAccountId(),
    getUserInfo: () => getUserInfo(),

    clear: () => clearTokens(),
  };
}