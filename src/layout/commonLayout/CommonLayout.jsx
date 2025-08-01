import { useLocation } from 'react-router-dom';
import BottomNavBar from '../../components/bottomNavBar/BottomNavBar';
import Header from '../../components/header/Header';
import ChatList from '../../pages/chatList/ChatList';
import Home from '../../pages/home/home';
import Profile from '../../pages/profile/Profile';
import { useEffect, useState } from 'react';

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
  const location = useLocation();
  const [isNav, setIsNav] = useState('');

  useEffect(() => {
    setIsNav(location.pathname);
  }, [location.pathname]);

  //bottom이 안붙는 케이스엔 여기에 추가
  const hiddenPaths = ['/post', '/chat'];
  return (
    <>
      <Header />
      <Content page={page} />
      {!hiddenPaths.includes(isNav) && <BottomNavBar />}
    </>
  );
};

export default CommonLayout;
