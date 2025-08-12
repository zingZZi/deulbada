import api from './api';

// GET: user 정보
export const fetchUser = (accountId) => {
  console.log('🌐 요청 URL:', `/api/users/profiles/${accountId}`);
  return api.get(`/api/users/profiles/${accountId}`);
};
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
