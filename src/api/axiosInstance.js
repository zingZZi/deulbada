import axios from 'axios';

const getToken = async () => {
  try {
    const response = await axios.post('http://43.201.70.73/api/token/', {
      email: 'admin2@naver.com',
      password: 'admin2',
    });
    return response.data.access;
  } catch (error) {
    console.error('토큰 발급 실패:', error);
  }
};

const axiosInstance = axios.create({
  baseURL: 'http://43.201.70.73',
  headers: {
    'Content-Type': 'application/json',
  },
});

// 요청 인터셉터로 매번 토큰 확인
axiosInstance.interceptors.request.use(async (config) => {
  const token = await getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosInstance;
