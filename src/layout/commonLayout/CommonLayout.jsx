import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import BottomNavBar from '../../components/bottomNavBar/BottomNavBar';
import Header from '../../components/header/Header';
import ChatList from '../../pages/chatList/ChatList';
import Home from '../../pages/home/Home';
import Profile from '../../pages/profile/Profile';
import Search from '../../pages/search/Search';
import Followers from '../../pages/followers/Followers';
import Followings from '../../pages/followings/Followings';
import { defaultHeaderMap } from '../../components/header/defaultHeader/headerConfigs';
import ActionSheet from '../../components/actionSheet/ActionSheet';
import ModalPopUp from '../../components/modalPopup/ModalPopup';
import useHeaderActions from '../../hooks/useHeaderAction';
import { PageActionsProvider } from '../../context/PageActionsContext';
import { PopupProvider, usePopup } from '../../context/PopupContext';
import MyProfile from '../../pages/profile/MyProfile';
import ChatRoom from '../../pages/chatRoom/ChatRoom';
import PostDetail from '../../pages/postDetail/PostDetail';
import Product from '../../pages/product/Product';
import PostUpload from '../../pages/postUpload/PostUpload';

import LoadingComponent from '../../components/loding/Loding';
import { LoadingProvider, useLoading } from '../../context/LoadingContext';
import MyProfileEdit from '../../pages/myProfileEdit/MyProfileEdit';
import { CustomThemeProvider } from '../../context/ThemeContext';

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
    case 'myprofile':
      return <MyProfile />;
    case 'chatRoom':
      return <ChatRoom />;
    case 'postDetail':
      return <PostDetail />;
  }
}

const CommonLayoutInner = ({ page }) => {
  const location = useLocation();
  const [isNav, setIsNav] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  // 전역 팝업 상태 사용 - modalConfig 추가
  const { isPopupOpen, popupConfig, isModalPopOpen, modalConfig, setIsPopupOpen } = usePopup();

  const { handleHeaderAction } = useHeaderActions();

  useEffect(() => {
    setIsNav(location.pathname);
  }, [location.pathname]);
  const currentHeaderConfig = defaultHeaderMap[location.pathname] || {};

  //bottom이 안붙는 케이스엔 여기에 추가
  const hiddenPaths = ['/post', '/chatRoom'];
  // 전역 로딩 상태 사용
  const { isLoading } = useLoading(); // 전역 로딩 중일 때 로딩 컴포넌트 표시
  if (isLoading) {
    return (
      <>
        <Header
          location={location}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          config={currentHeaderConfig}
          onAction={handleHeaderAction}
        />
        <LoadingComponent />
      </>
    );
  }
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

      {/* 전역 ActionSheet 팝업 (바텀영역 고정팝업) */}
      {isPopupOpen && popupConfig?.list && (
        <ActionSheet list={popupConfig.list} setIsPopupOpen={setIsPopupOpen} />
      )}

      {/* 전역 Modal 팝업 */}
      {isModalPopOpen && modalConfig?.modalList && (
        <ModalPopUp modalList={modalConfig.modalList} text={modalConfig.text} />
      )}
    </>
  );
};

const CommonLayout = ({ page }) => {
  return (
    <CustomThemeProvider>
      <PageActionsProvider>
        <PopupProvider>
          <LoadingProvider>
            <CommonLayoutInner page={page} />
          </LoadingProvider>
        </PopupProvider>
      </PageActionsProvider>
    </CustomThemeProvider>
  );
};

export default CommonLayout;
