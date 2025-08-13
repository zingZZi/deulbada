import api from '../api/api';

// GET: 전체 상품 조회
export const fetchProduct = () => api.get('/products/');

// GET: 카테고리별 상품조회
export const fetchProductFilter = (category, page = 1, limit = 4) =>
  api.get(`/products/category/${category}/?page=${page}&limit=${limit}`);

// GET: 유저 상품조회
export const getProductUser = (user_name) => api.get(`/products/user/${user_name}/`);
// POST: 상품등록
// export const createPost = () => api.get('/products/');

// POST: 상품등록 
export const createPost = (productData) => api.post('/products/', productData);