import { Routes, Route, Navigate } from 'react-router-dom';
import Guide from './pages/guide/Guide';
import CommonLayout from './layout/commonLayout/CommonLayout';
import LoginLayout from './layout/loginLayout/LoginLayout';
import { StyledContainer } from './styles/Container.style';
import NotFound from './pages/notFound/notFound';

function App() {
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
          <Route path="/profile-settings" element={<LoginLayout page={'profile-settings'} />} />
          <Route path="/product" element={<LoginLayout page={'product'} />} />
          <Route path="/signup" element={<LoginLayout page={'signup'} />} />
          <Route path="/editProfile" element={<LoginLayout page={'editProfile'} />} />

          {/* 비로그인일땐 로그인페이지로 옮기는 기능 필요 */}
          <Route path="/" element={<Navigate to="/home" replace />} />

          <Route path="/home" element={<CommonLayout page={'home'} />} />
          <Route path="/profile/:account_id" element={<CommonLayout page={'profile'} />} />
          <Route path="/followers" element={<CommonLayout page={'followers'} />} />
          <Route path="/followings" element={<CommonLayout page={'followings'} />} />
          <Route path="/myProfile" element={<CommonLayout page={'myprofile'} />} />
          <Route path="/search" element={<CommonLayout page={'search'} />} />
          <Route path="/chatList" element={<CommonLayout page={'chatList'} />} />

          {/*  404 페이지 */}
          <Route path="/404" element={<NotFound />} />
          <Route path="*" element={<Navigate to="/404" replace />} />
          <Route path="/chatRoom" element={<CommonLayout page={'chatRoom'} />} />
          <Route path="/postDetail/:postId" element={<CommonLayout page={'postDetail'} />} />
          <Route path="/postUpload" element={<CommonLayout page={'postUpload'} />} />
        </Routes>
      </StyledContainer>
    </>
  );
}

export default App;