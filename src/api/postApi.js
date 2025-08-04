import axiosInstance from './axiosInstance';

// GET: 전체 게시물 조회
export const fetchPosts = () => axiosInstance.get('/posts/posts/');
// POST: 게시물 작성
export const createPost = (postData) => axiosInstance.post('/posts/posts/', postData);
// GET: 게시물 상세 조회
export const getPostDetail = (id) => axiosInstance.get(`/posts/posts/${id}/`);
