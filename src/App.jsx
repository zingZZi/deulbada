import { Route, Routes } from 'react-router-dom';
import Guide from './pages/guide/Guide';
import CommonLayout from './layout/commonLayout/CommonLayout';
import LoginLayout from './layout/loginLayout/LoginLayout';
import { StyledContainer } from './styles/Container.style';

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

          <Route path="/home" element={<CommonLayout page={'home'} />} />
          <Route path="/profile" element={<CommonLayout page={'profile'} />} />
          <Route path="/chatList" element={<CommonLayout page={'chatList'} />} />
          <Route path="/chat" element={<CommonLayout page={'chat '} />} />
        </Routes>
      </StyledContainer>
    </>
  );
}

export default App;
