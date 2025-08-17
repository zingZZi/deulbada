import Login from '../../pages/login/Login';
import LoginEmail from '../../pages/LoginEmail/LoginEmail';
import JoinMembership from '../../pages/JoinMembership/JoinMembership';
import JoinProducer from '../../pages/JoinProducer/JoinProducer';
import Product from '../../pages/product/Product';
import { StyledLoginLayout } from './LoginLayout.style';


function Content({ page }) {
  switch (page) {
    case 'login':
      return <Login />;
    case 'loginEmail':
      return <LoginEmail />;
        case 'JoinMembership':
      return <JoinMembership />;
        case 'JoinProducer':
      return <JoinProducer />;
        case 'product':
      return <Product />;
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
