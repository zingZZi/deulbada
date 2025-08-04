import { useEffect, useMemo, useState } from 'react';
import * as Styled from './Search.style';
import UserInfo from '../../components/userInfo/UserInfo';
const garaData = [
  {
    account_id: 'weniv_Mandarin',
    username: '애월읍 위니브 감귤농장 ',
    useprofile_image:
      'https://pixabay.com/ko/photos/%EA%B3%A0%EC%96%91%EC%9D%B4-%EB%A3%A8-%EB%8A%99%EC%9D%80-%EB%B0%94%EB%9D%BC%EB%B3%B4%EB%8B%A4-5183427/',
  },
  {
    account_id: 'test_Mandarin',
    username: '테스트 ',
    useprofile_image:
      'https://pixabay.com/ko/photos/%EA%B3%A0%EC%96%91%EC%9D%B4-%EB%A3%A8-%EB%8A%99%EC%9D%80-%EB%B0%94%EB%9D%BC%EB%B3%B4%EB%8B%A4-5183427/',
  },
];

const Search = ({ searchQuery }) => {
  const [lists, setList] = useState([]);
  useEffect(() => {
    setList(garaData);
  }, []);

  const query = searchQuery.toLowerCase();
  const searchList = useMemo(() => {
    if (!searchQuery.trim()) return []; // 입력 없으면 빈 리스트

    return lists.filter(
      (e) => e.account_id.toLowerCase().includes(query) || e.username.toLowerCase().includes(query)
    );
  }, [searchQuery, lists, query]);

  return (
    <>
      <Styled.SearchList>
        {searchList.map((e) => {
          return (
            <Styled.SearchItem key={e.account_id}>
              <UserInfo
                key={e.account_id}
                username={e.username}
                accountId={e.account_id}
                highlightQuery={query}
              />
            </Styled.SearchItem>
          );
        })}
      </Styled.SearchList>
      {searchQuery && searchList.length === 0 && (
        <Styled.NoResult>검색 결과가 없습니다.</Styled.NoResult>
      )}
    </>
  );
};

export default Search;
