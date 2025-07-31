import Login from '../../pages/login/Login';
import LoginEmail from '../../pages/login-email/LoginEmail';
import { StyledLoginLayout } from './LoginLayout.style';


function Content({ page }) {
  switch (page) {
    case 'login':
      return <Login />;
    case 'loginEmail':
      return <LoginEmail />;
  }
}

const LoginLayout = ({ page }) => {
  return (
    <StyledLoginLayout>
      <h1 className="text-ir">들바다</h1>
      <Content page={page} />
    </StyledLoginLayout>
  );
};

export default LoginLayout;
