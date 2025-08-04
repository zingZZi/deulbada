import { useLocation } from 'react-router-dom';
import BottomNavBar from '../../components/bottomNavBar/BottomNavBar';
import Header from '../../components/header/Header';
import ChatList from '../../pages/chatList/ChatList';
import Home from '../../pages/home/home';
import Profile from '../../pages/profile/Profile';
import { useEffect, useState } from 'react';
import Search from '../../pages/search/Search';
import ChatRoom from '../../pages/chatRoom/ChatRoom';

function Content({ page, searchQuery }) {
  switch (page) {
    case 'home':
      return <Home />;
    case 'profile':
      return <Profile />;
    case 'search':
      return <Search searchQuery={searchQuery} />;
    case 'chatList':
      return <ChatList />;
    case 'chatRoom':
      return <ChatRoom />;
  }
}

const CommonLayout = ({ page }) => {
  const location = useLocation();
  const [isNav, setIsNav] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    setIsNav(location.pathname);
  }, [location.pathname]);

  //bottom이 안붙는 케이스엔 여기에 추가
  const hiddenPaths = ['/post', '/chatRoom'];
  return (
    <>
      <Header location={location} searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <Content page={page} searchQuery={searchQuery} />
      {!hiddenPaths.includes(isNav) && <BottomNavBar />}
    </>
  );
};

export default CommonLayout;
