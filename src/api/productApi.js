import api from '../api/api';

// GET: 전체 상품 조회
export const fetchProduct = () => api.get('/products/');
// GET: 카테고리별 상품조회
export const getPostDetail = (id) => api.get(`/products/${id}/`);
// POST: 상품등록
export const createPost = () => api.get('/products/');
