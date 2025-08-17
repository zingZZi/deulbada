// src/App.jsx
import { Routes, Route, Navigate } from 'react-router-dom';
import Guide from './pages/guide/Guide';
import CommonLayout from './layout/commonLayout/CommonLayout';
import LoginLayout from './layout/loginLayout/LoginLayout';
import { StyledContainer } from './styles/Container.style';
import NotFound from './pages/notFound/NotFound';
import RequireAuth from './auth/RequireAuth';
import { useEffect, useState } from 'react';
import { verifyToken } from './auth/authService';
import PostUpload from './pages/postUpload/PostUpload';
import Splash from './pages/splash/Splash';

export default function App() {
  const [showSplash, setShowSplash] = useState(() => {
    return !sessionStorage.getItem('app_loaded');
  });
  useEffect(() => {
    verifyToken();

    // 최초 로딩이고 스플래시를 보여주는 경우에만
    if (showSplash) {
      // 스플래시가 완료되면 세션에 기록
      const timer = setTimeout(() => {
        sessionStorage.setItem('app_loaded', 'true');
        setShowSplash(false);
      }, 2500);

      return () => clearTimeout(timer);
    }
  }, [showSplash]);

  const handleSplashComplete = () => {
    sessionStorage.setItem('app_loaded', 'true');
    setShowSplash(false);
  };
  return (
    <>
      {showSplash && <Splash onComplete={handleSplashComplete} />}
      <StyledContainer>
        <Routes>
          {/* 샘플/가이드: 공개 */}
          <Route path="/guide" element={<Guide />} />

          {/* 공개 라우트 */}
          <Route path="/login" element={<LoginLayout page={'login'} />} />
          <Route path="/loginEmail" element={<LoginLayout page={'loginEmail'} />} />
          <Route path="/joinMembership" element={<LoginLayout page={'joinMembership'} />} />
          <Route path="joinProducer" element={<LoginLayout page={'joinProducer'} />} />

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
            <Route path="/chat" element={<CommonLayout page={'chat'} />} />
            <Route path="/chatRoom/:roomId" element={<CommonLayout page={'chatRoom'} />} />
            <Route path="/product" element={<CommonLayout page={'product'} />} />
            <Route path="/editProfile" element={<CommonLayout page={'editProfile'} />} />
            <Route path="/post/:postId" element={<CommonLayout page={'post'} />} />
            <Route path="/profileSettings" element={<CommonLayout page={'profileSettings'} />} />
            <Route path="/postDetail/:postId" element={<CommonLayout page={'postDetail'} />} />
            <Route path="/postUpload" element={<CommonLayout page={'postUpload'} />} />
            <Route path="/postEdit/:postId" element={<CommonLayout page={'postUpload'} />} />
          </Route>

          {/* 404 */}
          <Route path="/404" element={<NotFound />} />
          <Route path="*" element={<Navigate to="/404" replace />} />
        </Routes>
      </StyledContainer>
    </>
  );
}
