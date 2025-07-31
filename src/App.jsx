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
          <Route path="/signup" element={<LoginLayout page={'signup '} />} />
          <Route path="/editProfile" element={<LoginLayout page={'editProfile'} />} />

          <Route path="/home" element={<CommonLayout page={'home'} />} />
          <Route path="/profile" element={<CommonLayout page={'profile'} />} />
          <Route path="/chatList" element={<CommonLayout page={'chatList'} />} />
          
        </Routes>
      </StyledContainer>
    </>
  );
}

export default App;
