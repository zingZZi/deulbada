import axiosInstance from './axiosInstance';

// GET: user 정보
export const fetchUser = (accountId) => axiosInstance.get(`/users/${accountId}`);

// GET: user 검색
export const SearchUser = (searchString) => {
  console.log('🚀 API 호출 시작 - 검색어:', searchString);
  console.log('🌐 요청 URL:', `/api/users/search/?q=${searchString}`);
  return axiosInstance
    .get(`/api/users/search/?q=${searchString}`)
    .then((response) => {
      console.log('✅ API 응답 성공:', response);
      return response;
    })
    .catch((error) => {
      console.error('❌ API 응답 실패:', error);
      throw error;
    });
};

// GET: 팔로워 정보
export const fetchFollowers = (accountId) => axiosInstance.get(`/users/followers/${accountId}`);

// GET: 팔로잉 정보
export const fetchFollowing = (accountId) => axiosInstance.get(`/users/following/${accountId}`);
