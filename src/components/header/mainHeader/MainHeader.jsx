import * as Styled from './MainHeader.style';
import Logo from './../../../assets/images/deulbadaLogo.svg';
import { Link } from 'react-router-dom';
import { SearchIcon } from '../../icon/Icons';
const MainHeader = () => {
  return (
    <>
      <Styled.Logo>
        <Link to="/home">
          <img src={Logo} alt="" />
        </Link>
      </Styled.Logo>

      <Link to="/search">
        <span className="text-ir">검색창</span>
        <SearchIcon size={'2.4rem'} />
      </Link>
    </>
  );
};

export default MainHeader;
