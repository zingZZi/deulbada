import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import BottomNavBar from '../../components/bottomNavBar/BottomNavBar';
import Header from '../../components/header/Header';
import ChatList from '../../pages/chatList/ChatList';
import Profile from '../../pages/profile/Profile';
import Search from '../../pages/search/Search';
import Followers from '../../pages/followers/Followers';
import Followings from '../../pages/followings/Followings';
import { defaultHeaderMap } from '../../components/header/defaultHeader/headerConfigs';
import ActionSheet from '../../components/actionSheet/ActionSheet';
import ModalPopUp from '../../components/modalPopup/ModalPopup';
import Home from '../../pages/home/home';

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
    case 'followers':
      return <Followers />;
    case 'followings':
      return <Followings />;
  }
}

const CommonLayout = ({ page }) => {
  const location = useLocation();
  const [isNav, setIsNav] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [popupConfig, setPopupConfig] = useState(null);
  const [isModalPopOpen, setIsModalPopOpen] = useState(false);

  const handleHeaderAction = (actionKey) => {
    switch (actionKey) {
      case 'openProfileMenu':
        setIsPopupOpen(true);
        setPopupConfig({
          text: '로그아웃',
          list: [
            { label: '설정 및 개인정보', action: () => console.log('설정으로 이동') },
            {
              label: '로그아웃',
              action: () => {
                setIsPopupOpen(false);
                setIsModalPopOpen(true);
              },
            },
          ],
          modalList: [
            { text: '취소', action: () => setIsModalPopOpen(false) },
            { text: '로그아웃', action: () => console.log('로그아웃') },
          ],
        });
        break;
      case 'openChatMenu':
        setIsPopupOpen(true);
        setPopupConfig({
          list: [{ label: '채팅방 나가기', action: () => console.log('채팅방나가기') }],
        });
        break;
      default:
        console.warn('Unknown action:', actionKey);
    }
  };

  useEffect(() => {
    setIsNav(location.pathname);
  }, [location.pathname]);

  //bottom이 안붙는 케이스엔 여기에 추가
  const hiddenPaths = ['/post', '/chat'];
  const currentHeaderConfig = defaultHeaderMap[location.pathname] || {};
  return (
    <>
      <Header
        location={location}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        config={currentHeaderConfig}
        onAction={handleHeaderAction}
      />
      <Content page={page} searchQuery={searchQuery} />
      {!hiddenPaths.includes(isNav) && <BottomNavBar />}
      {/* ✅ 팝업 UI 예시 */}
      {isPopupOpen && <ActionSheet list={popupConfig.list} setIsPopupOpen={setIsPopupOpen} />}
      {isModalPopOpen && <ModalPopUp modalList={popupConfig.modalList} text={popupConfig.text} />}
    </>
  );
};

export default CommonLayout;
