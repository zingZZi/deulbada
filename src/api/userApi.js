import axiosInstance from './axiosInstance';

// GET: user 정보
export const fetchUser = (accountId) => axiosInstance.get(`/users/${accountId}`);

// GET: user 검색
export const SearchUser = (searchString) => axiosInstance.get(`/users/search/?q=${searchString}`);
