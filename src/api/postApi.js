import axiosInstance from './axiosInstance';

// GET: 전체 게시물 조회
export const fetchPosts = () => axiosInstance.get('/posts');
// POST: 게시물 작성
export const createPost = (postData) => axiosInstance.post('/posts/', postData);
// GET: 게시물 상세 조회
export const getPostDetail = (id) => axiosInstance.get(`/posts/${id}/`);
// GET: user  postList조회
export const getUserPost = (userId) => axiosInstance.get(`/posts/${userId}/`);
// Delete: user  post 삭제
export const delePost = (postId) => axiosInstance.delete(`/posts/${postId}/`);

//좋아요 상호작용
export const togglePostLike = (id) => axiosInstance.post(`/posts/${id}/like/`);
//commonet 글쓰기
export const fetchComment = (id) => axiosInstance.post(`/posts/${id}/comment/`);
