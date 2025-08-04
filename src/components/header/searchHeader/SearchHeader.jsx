import { useEffect } from 'react';
import { ArrowIcon } from '../../icon/Icons';
import * as Styled from './SearchHeader.stye';
import { NolineIconBtn } from '../../../styles/Button.style';
const SearchHeader = ({ searchQuery, setSearchQuery }) => {
  function searchForm(e) {
    e.preventDefault();
  }
  useEffect(() => {
    setSearchQuery('');
  }, []);
  return (
    <>
      <NolineIconBtn onClick={() => window.history.back()}>
        <ArrowIcon />
      </NolineIconBtn>
      <Styled.HeaderForm onSubmit={searchForm}>
        <Styled.HeaderInput
          type="text"
          placeholder="검색어 입력"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </Styled.HeaderForm>
    </>
  );
};

export default SearchHeader;
