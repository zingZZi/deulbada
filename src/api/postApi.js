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

// 게시글 수정
export const updatePost = (postId, formData) =>
  api.patch(`/posts/${postId}/edit/`, formData); 

// Delete: user  post 삭제
export const delePost = (postId) => api.delete(`/posts/${postId}/edit/`);

//좋아요 상호작용
export const togglePostLike = (id) => api.post(`/posts/${id}/like/`);
// 댓글 목록 가져오기
export const getComments = (postId) => api.get(`/posts/${postId}/comments/`);

// 댓글 작성하기
export const createComment = (postId, commentData) =>
  api.post(`/posts/${postId}/comments/new/`, commentData);

// 댓글 삭제하기
export const deleteComment = (commentId) => api.delete(`/posts/comments/${commentId}/`);

// 댓글 신고하기 (신고 API가 있다면)
export const reportComment = (commentId, reason = '') =>
  api.post(`/posts/comments/${commentId}/report/`, { reason });
