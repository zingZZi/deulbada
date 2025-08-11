import { Routes, Route, Navigate } from 'react-router-dom';
import Guide from './pages/guide/Guide';
import CommonLayout from './layout/commonLayout/CommonLayout';
import LoginLayout from './layout/loginLayout/LoginLayout';
import { StyledContainer } from './styles/Container.style';
import NotFound from './pages/notFound/notFound';
import { useEffect } from 'react';

function App() {
  //로그인 구현전 회원정보 강제로 로컬스토리지
  useEffect(() => {
    // eslint-disable-next-line no-undef
    if (process.env.NODE_ENV === 'development') {
      // 무조건 새로 설정 (기존 값 덮어쓰기)
      localStorage.setItem('account_id', 'user_id_5');
      localStorage.setItem('user_name', 'user_name_5');

      console.log('🧪 임시 사용자 정보가 설정되었습니다:', {
        account_id: 'user_id_5',
        user_name: 'user_name_5',
      });
    }
  }, []);

  return (
    <>
      <StyledContainer>
        <Routes>
          {/* 샘플루트 */}
          <Route path="/guide" element={<Guide />} />

          <Route path="/login" element={<LoginLayout page={'login'} />} />
          <Route path="/login-email" element={<LoginLayout page={'loginEmail'} />} />
          <Route path="/join-membership" element={<LoginLayout page={'join-membership'} />} />
          <Route path="/join-producer" element={<LoginLayout page={'join-producer'} />} />
          <Route path="/signup" element={<LoginLayout page={'signup'} />} />
          <Route path="/editProfile" element={<LoginLayout page={'editProfile'} />} />

          {/* 비로그인일땐 로그인페이지로 옮기는 기능 필요 */}
          <Route path="/" element={<Navigate to="/home" replace />} />

          <Route path="/home" element={<CommonLayout page={'home'} />} />
          <Route path="/profile/:user_name" element={<CommonLayout page={'profile'} />} />
          <Route path="/followers/:user_name" element={<CommonLayout page={'followers'} />} />
          <Route path="/followings/:user_name" element={<CommonLayout page={'followings'} />} />
          <Route path="/profile/edit" element={<CommonLayout page={'myprofileEdit'} />} />
          <Route path="/myprofile" element={<CommonLayout page={'myprofile'} />} />
          <Route path="/search" element={<CommonLayout page={'search'} />} />
          <Route path="/chatList" element={<CommonLayout page={'chatList'} />} />
          <Route path="/chat" element={<CommonLayout page={'chat '} />} />

          {/*  404 페이지 */}
          <Route path="/404" element={<NotFound />} />
          <Route path="*" element={<Navigate to="/404" replace />} />
          <Route path="/chatRoom" element={<CommonLayout page={'chatRoom'} />} />
          <Route path="/post/:postId" element={<CommonLayout page={'post'} />} />
        </Routes>
      </StyledContainer>
    </>
  );
}

export default App;
