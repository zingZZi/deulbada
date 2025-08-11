// src/auth/tokenStore.js
let memory = { access: null, refresh: null };

export function setTokens(access, refresh) {
  memory.access = access || null;
  memory.refresh = refresh || null;
  console.log('[tokenStore] setTokens called:', { access, refresh }); // 🔍 확인용
}

export function getAccessToken() {
  return memory.access; 
}

export function getRefreshToken() {
  return memory.refresh; 
}

export function clearTokens() {
  memory = { access: null, refresh: null };
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