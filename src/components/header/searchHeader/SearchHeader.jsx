import { ArrowIcon } from '../../icon/Icons';
import * as Styled from './SearchHeader.stye';
const SearchHeader = () => {
  return (
    <>
      <button onClick={() => window.history.back()}>
        <ArrowIcon />
      </button>
      <Styled.HeaderForm action="">
        <Styled.HeaderInput type="text" placeholder="검색어 입력" />
      </Styled.HeaderForm>
    </>
  );
};

export default SearchHeader;
