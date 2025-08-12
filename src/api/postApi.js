import api from '../api/api';

// GET: 전체 게시물 조회
export const fetchPosts = () => api.get('/posts');
// POST: 게시물 작성
export const createPost = (postData) => api.post('/posts/', postData);
// GET: 게시물 상세 조회
export const getPostDetail = (id) => api.get(`/posts/${id}/`);

//좋아요수
export const fetchLike = (id) => api.get(`/posts/${id}/like/`);
