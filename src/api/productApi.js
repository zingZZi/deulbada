import axiosInstance from './axiosInstance';

// GET: 전체 상품 조회
export const fetchProduct = () => axiosInstance.get('/products/');
// GET: 카테고리별 상품조회
export const fetchProductFilter = (category) => axiosInstance.get(`/products/${category}`);
// GET: 유저 상품조회
export const getProductUser = (user_name) => axiosInstance.get(`/products/${user_name}/`);
// POST: 상품등록
export const createPost = () => axiosInstance.get('/products/');
