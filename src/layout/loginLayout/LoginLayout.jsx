import Login from '../../pages/login/Login';
import LoginEmail from '../../pages/login-email/LoginEmail';
import JoinMembership from '../../pages/join-membership/JoinMembership';
import JoinProducer from '../../pages/join-producer/JoinProducer';
import ProfileSettings from '../../pages/profile-settings/ProfileSettings';
import { StyledLoginLayout } from './LoginLayout.style';


function Content({ page }) {
  switch (page) {
    case 'login':
      return <Login />;
    case 'loginEmail':
      return <LoginEmail />;
        case 'join-membership':
      return <JoinMembership />;
        case 'join-producer':
      return <JoinProducer />;
        case 'profile-settings':
      return <ProfileSettings />;
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
