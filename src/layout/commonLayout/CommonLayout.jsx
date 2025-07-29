import Header from '../../components/header/Header';
import ChatList from '../../pages/chatList/ChatList';
import Home from '../../pages/home/home';

function Content({ page }) {
  switch (page) {
    case 'home':
      return <Home />;
    case 'chatList':
      return <ChatList />;
  }
}

const CommonLayout = ({ page }) => {
  return (
    <>
      <Header />
      <Content page={page} />
    </>
  );
};

export default CommonLayout;
