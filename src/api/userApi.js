import axiosInstance from './axiosInstance';

// GET: user 정보
export const fetchUser = (accountId) => {
  console.log('🌐 요청 URL:', `/api/users/profiles/${accountId}`);
  return axiosInstance.get(`/api/users/profiles/${accountId}`);
};
// GET: user 검색
export const SearchUser = (searchString) => {
  return axiosInstance
    .get(`/api/users/search/?q=${searchString}`)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      throw error;
    });
};

// GET: 팔로워 정보
export const fetchFollowers = (accountId) =>
  axiosInstance.get(`/api/users/profiles/${accountId}/followers/`);

// GET: 팔로잉 정보
export const fetchFollowing = (accountId) =>
  axiosInstance.get(`/api/users/profiles/${accountId}/following/`);

//Post 팔로잉하기
export const toggleFollow = (accountId) =>
  axiosInstance.post(`/api/users/profiles/${accountId}/follow/`);
