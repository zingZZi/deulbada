// src/App.jsx
import { Routes, Route, Navigate } from 'react-router-dom';
import Guide from './pages/guide/Guide';
import CommonLayout from './layout/commonLayout/CommonLayout';
import LoginLayout from './layout/loginLayout/LoginLayout';
import { StyledContainer } from './styles/Container.style';
import NotFound from './pages/notFound/NotFound';
import RequireAuth from './auth/RequireAuth';
import { useEffect } from 'react';
import { verifyToken } from './auth/authService';

export default function App() {
  useEffect(() => {
    // 앱 로드될 때 토큰 유효성 검사
    verifyToken();
  }, []);
  return (
    <StyledContainer>
      <Routes>
        {/* 샘플/가이드: 공개 */}
        <Route path="/guide" element={<Guide />} />

        {/* 공개 라우트 */}
        <Route path="/login" element={<LoginLayout page={'login'} />} />
        <Route path="/login-email" element={<LoginLayout page={'loginEmail'} />} />
        <Route path="/join-membership" element={<LoginLayout page={'join-membership'} />} />
        <Route path="/join-producer" element={<LoginLayout page={'join-producer'} />} />

        {/* 루트 접근 시 홈으로 이동 (홈은 보호 처리됨) */}
        <Route path="/" element={<Navigate to="/home" replace />} />

        {/* 보호 라우트 묶음: 로그인 필요 */}
        <Route element={<RequireAuth />}>
          <Route path="/home" element={<CommonLayout page={'home'} />} />
          <Route path="/profile/:accountId" element={<CommonLayout page={'profile'} />} />
          <Route path="/followers/:accountId" element={<CommonLayout page={'followers'} />} />
          <Route path="/followings/:accountId" element={<CommonLayout page={'followings'} />} />
          <Route path="/profile/edit" element={<CommonLayout page={'myprofileEdit'} />} />
          <Route path="/myprofile" element={<CommonLayout page={'myprofile'} />} />
          <Route path="/search" element={<CommonLayout page={'search'} />} />
          <Route path="/chatList" element={<CommonLayout page={'chatList'} />} />

          {/*  404 페이지 */}
          <Route path="/404" element={<NotFound />} />
          <Route path="*" element={<Navigate to="/404" replace />} />
        <Route path="/chatRoom/:userId" element={<CommonLayout page={'chatRoom'} />} />
          <Route path="/postDetail/:postId" element={<CommonLayout page={'postDetail'} />} />
          <Route path="/postUpload" element={<CommonLayout page={'postUpload'} />} />
        </Route>

        {/* 404 */}
        <Route path="/404" element={<NotFound />} />
        <Route path="*" element={<Navigate to="/404" replace />} />
      </Routes>
    </StyledContainer>
  );
}
