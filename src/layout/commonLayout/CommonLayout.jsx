import BottomNavBar from '../../components/bottomNavBar/BottomNavBar';
import Header from '../../components/header/Header';
import ChatList from '../../pages/chatList/ChatList';
import Home from '../../pages/home/home';
import Profile from '../../pages/profile/Profile';

function Content({ page }) {
  switch (page) {
    case 'home':
      return <Home />;
    case 'profile':
      return <Profile />;
    case 'chatList':
      return <ChatList />;
  }
}

const CommonLayout = ({ page }) => {
  return (
    <>
      <Header />
      <Content page={page} />
      <BottomNavBar />
    </>
  );
};

export default CommonLayout;
