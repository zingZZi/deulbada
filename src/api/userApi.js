import api from './api';

// GET: user 정보
export const fetchUser = (accountId) => api.get(`/api/users/profiles/${accountId}`);
// GET: user 검색
export const SearchUser = (searchString) => {
  return api
    .get(`/api/users/search/?q=${searchString}`)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      throw error;
    });
};

// GET: 팔로워 정보
export const fetchFollowers = (accountId) => api.get(`/api/users/profiles/${accountId}/followers/`);

// GET: 팔로잉 정보
export const fetchFollowing = (accountId) => api.get(`/api/users/profiles/${accountId}/following/`);

//Post 팔로잉하기
export const toggleFollow = (accountId) => api.post(`/api/users/profiles/${accountId}/follow/`);

export const editProfile = (formData) =>
  api.patch('/api/users/mypage/profile/setup/', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
export const checkAccountId = (accountId) =>
  api.get(`/api/users/check-account-id/`, {
    params: { account_id: accountId },
  });
