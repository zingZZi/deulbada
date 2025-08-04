import DefaultHeader from './defaultHeader/DefaultHeader';
import * as Styled from './Header.style';
import MainHeader from './mainHeader/MainHeader';
import SearchHeader from './searchHeader/SearchHeader';

const Header = ({ location, searchQuery, setSearchQuery }) => {
  const renderHeaderContent = (location) => {
    switch (location.pathname) {
      case '/home':
        return <MainHeader />;

      case '/search':
        return <SearchHeader searchQuery={searchQuery} setSearchQuery={setSearchQuery} />;

      default:
        return <DefaultHeader location={location} />;
    }
  };

  return <Styled.Header>{renderHeaderContent(location)}</Styled.Header>;
};
export default Header;
