import DefaultHeader from './defaultHeader/DefaultHeader';
import * as Styled from './Header.style';
import MainHeader from './mainHeader/MainHeader';
import SearchHeader from './searchHeader/SearchHeader';

const Header = ({ location }) => {
  const renderHeaderContent = (location) => {
    switch (location.pathname) {
      case '/home':
        return <MainHeader />;

      case '/search':
        return <SearchHeader />;

      default:
        return <DefaultHeader />;
    }
  };

  return <Styled.Header>{renderHeaderContent(location)}</Styled.Header>;
};
export default Header;
