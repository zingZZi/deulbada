import { getAccessToken } from '../auth/tokenStore';
import api from '../api/api'; // 기존 Axios api 다시 활성화

const API_BASE_URL = 'http://43.201.70.73';

// API 응답 처리 함수
const handleResponse = async (response) => {
  if (!response.ok) {
    const errorData = await response.text();
    console.error('API 에러 응답:', errorData);
    throw new Error(`HTTP ${response.status}: ${errorData}`);
  }
  return response.json();
};

// 기존 Axios 함수들 (다른 컴포넌트에서 사용 중)
export const fetchProduct = () => api.get('/products/');
export const fetchProductFilter = (category, page = 1, limit = 4) =>
  api.get(`/products/category/${category}/?page=${page}&limit=${limit}`);
export const getProductUser = (user_name) => api.get(`/products/user/${user_name}/`);

// 상품 생성 API (fetch 사용)
export const createPost = async (productData) => {
  try {
    // 토큰 가져오기 및 확인
    const token = getAccessToken();
    console.log('=== 상품 생성 API 디버깅 ===');
    console.log('토큰:', token ? `${token.substring(0, 20)}...` : '없음');
    console.log('상품 데이터:', productData);
    console.log('image_urls 타입:', typeof productData.image_urls, Array.isArray(productData.image_urls));
    console.log('image_urls 내용:', productData.image_urls);

    if (!token) {
      throw new Error('인증 토큰이 없습니다. 다시 로그인해주세요.');
    }

    const response = await fetch(`${API_BASE_URL}/products/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(productData),
    });

    console.log('API 응답 상태:', response.status);
    console.log('API 응답 헤더:', Object.fromEntries(response.headers.entries()));

    return await handleResponse(response);
  } catch (error) {
    console.error('상품 생성 API 실패:', error);
    throw error;
  }
};

// 추가 fetch 버전 API들 (필요 시 사용)

// 상품 목록 조회 API (fetch 버전)
export const getPosts = async () => {
  try {
    const token = getAccessToken();
    const response = await fetch(`${API_BASE_URL}/products/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    });
    return await handleResponse(response);
  } catch (error) {
    console.error('상품 목록 조회 API 실패:', error);
    throw error;
  }
};

// 상품 상세 조회 API (fetch 버전)
export const getPost = async (id) => {
  try {
    const token = getAccessToken();
    const response = await fetch(`${API_BASE_URL}/products/${id}/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    });
    return await handleResponse(response);
  } catch (error) {
    console.error('상품 상세 조회 API 실패:', error);
    throw error;
  }
};

// 상품 수정 API (fetch 버전)
export const updatePost = async (id, productData) => {
  try {
    const token = getAccessToken();
    const response = await fetch(`${API_BASE_URL}/products/${id}/`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(productData),
    });
    return await handleResponse(response);
  } catch (error) {
    console.error('상품 수정 API 실패:', error);
    throw error;
  }
};

// 상품 삭제 API (fetch 버전)
export const deletePost = async (id) => {
  try {
    const token = getAccessToken();
    const response = await fetch(`${API_BASE_URL}/products/${id}/`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    });

    if (!response.ok) {
      const errorData = await response.text();
      throw new Error(`HTTP ${response.status}: ${errorData}`);
    }

    return true;
  } catch (error) {
    console.error('상품 삭제 API 실패:', error);
    throw error;
  }
};