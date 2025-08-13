import { useEffect, useState } from 'react';
import * as Styled from './Search.style';
import UserInfo from '../../components/userInfo/UserInfo';
import { UserSearchIcon } from '../../components/icon/Icon.style';
import { SearchUser } from '../../api/userApi'; // API 함수 import

const Search = ({ searchQuery }) => {
  const [lists, setList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // API 호출 함수
  const fetchSearchResults = async (query) => {
    if (!query.trim()) {
      setList([]);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const response = await SearchUser(query);
      // API 응답에서 results 배열 추출
      const userData = response.data?.results || [];
      setList(userData);
    } catch (err) {
      console.error('검색 API 오류:', err);
      setError('검색 중 오류가 발생했습니다.');
      setList([]);
    } finally {
      setLoading(false);
    }
  };

  // searchQuery가 변경될 때마다 API 호출
  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      fetchSearchResults(searchQuery);
    }, 300); // 300ms 디바운스 적용

    return () => clearTimeout(debounceTimer);
  }, [searchQuery]);

  const query = searchQuery.toLowerCase();

  // 로딩 상태
  if (loading) {
    return (
      <Styled.NoResult>
        <UserSearchIcon size={'6rem'} />
        검색 중...
      </Styled.NoResult>
    );
  }

  // 에러 상태
  if (error) {
    return (
      <Styled.NoResult>
        <UserSearchIcon size={'6rem'} />
        {error}
      </Styled.NoResult>
    );
  }
  console.log(lists);
  return (
    <>
      {searchQuery && lists.length === 0 ? (
        <Styled.NoResult>
          <UserSearchIcon size={'6rem'} />
          검색 결과가 없습니다.
        </Styled.NoResult>
      ) : (
        <Styled.SearchList>
          {lists.map((user) => {
            return (
              <Styled.SearchItem key={user.id}>
                <UserInfo
                  to={`/profile/${user.account_id}`}
                  key={user.id}
                  profileImg={user.profile_image}
                  username={user.username}
                  accountId={user.account_id}
                  is_farm_verified={user.is_farm_verified || false} // API에 없으면 false
                  highlightQuery={query}
                />
              </Styled.SearchItem>
            );
          })}
        </Styled.SearchList>
      )}
    </>
  );
};

export default Search;
