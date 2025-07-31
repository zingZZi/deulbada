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
      <h1 className="text-ir">들바다</h1>
      <Content page={page} />
    </StyledLoginLayout>
  );
};

export default LoginLayout;
