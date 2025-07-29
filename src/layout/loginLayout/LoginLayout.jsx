import Login from '../../pages/login/Login';
import { StyledLoginLayout } from './LoginLayout.style';

function Content({ page }) {
  switch (page) {
    case 'login':
      return <Login />;
  }
}

const LoginLayout = ({ page }) => {
  return (
    <StyledLoginLayout>
      <h1>페이지 제목</h1>
      <Content page={page} />
    </StyledLoginLayout>
  );
};

export default LoginLayout;
