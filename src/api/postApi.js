import api from '../api/api';

// GET: 전체 게시물 조회
export const fetchPosts = (page = 1, limit = 4) =>
  api.get(`/posts/?page=${page}&page_size=${limit}`);
// POST: 게시물 작성
export const createPost = (postData) => api.post('/posts/', postData);
// GET: 게시물 상세 조회
export const getPostDetail = (id) => api.get(`/posts/${id}/`);
// GET: user  postList조회
export const getUserPost = (userId, page = 1, limit = 2) =>
  api.get(`/posts/by/${userId}/?page=${page}&page_size=${limit}`);
// Delete: user  post 삭제
export const delePost = (postId) => api.delete(`/posts/${postId}/`);

//좋아요 상호작용
export const togglePostLike = (id) => api.post(`/posts/${id}/like/`);
//commonet 글쓰기
export const fetchComment = (id) => api.post(`/posts/${id}/comment/`);
