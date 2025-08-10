import axios from 'axios';
import axiosInstance from './axiosInstance'; // 경로는 실제 위치에 맞게 조정

export const login = async (account_id, password) => {
  // 1. 로그인 요청
  const response = await axios.post('http://43.201.70.73/api/token/', {
    account_id,
    password,
  });

  const { access, refresh } = response.data;

  // 2. 로컬스토리지에 토큰 저장
  localStorage.setItem('accessToken', access);
  localStorage.setItem('refreshToken', refresh);

  // 3. 로그인 후 유저 정보 조회 (선택)
  try {
    const res = await axiosInstance.get('/api/user/me');
    console.log('유저 정보:', res.data);
    return res.data; // 필요 시 유저 정보 반환
  } catch (err) {
    console.error('유저 정보 가져오기 실패:', err);
    throw err;
  }
};