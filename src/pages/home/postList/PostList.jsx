import { useEffect, useState } from 'react';
import * as Styled from './PostList.style';
import { fetchPosts } from '../../../api/postApi';
import UserInfo from '../../../components/userInfo/UserInfo';
import PostContent from '../../../components/postContent/PostContent';
import LoadingComponent from '../../../components/loding/Loding';
import { useScrollObserver } from '../../../hooks/useScrollObserver';
import { CameraIcon } from '../../../components/icon/Icons';

const PostList = () => {
  const [postList, setPostList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMorePage, setHasMorePage] = useState(true);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const isBottom = useScrollObserver();
  // 무한 스크롤 처리 - 원래 로직 유지
  useEffect(() => {
    if (isBottom && !isLoading && hasMorePage && !isInitialLoad && postList.length > 0) {
      const timer = setTimeout(() => {
        if (!isLoading && hasMorePage) {
          setPage((prevPage) => prevPage + 1);
        }
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [isBottom, isLoading, hasMorePage, isInitialLoad, postList.length]);

  // 데이터 로드 - 원래 로직 유지
  useEffect(() => {
    const getPost = async () => {
      try {
        setIsLoading(true);
        const response = await fetchPosts(page);
        const data = response.data.results || response.data;
        const nextPage = response.data.next;

        if (nextPage === null) {
          setHasMorePage(false);
        }

        if (page === 1) {
          setPostList(data || []);
          setIsInitialLoad(false);
        } else {
          setPostList((prevProductList) => [...prevProductList, ...(data || [])]);
        }
      } catch (error) {
        console.error('Post를 불러오지 못했습니다.', error);
      } finally {
        setIsLoading(false);
      }
    };

    getPost();
  }, [page]);

  // 초기 로딩 중일 때 로딩 컴포넌트 표시
  if (isInitialLoad && isLoading) {
    return <LoadingComponent />;
  }
  return (
    <>
      {postList && postList.length > 0 ? (
        <ul>
          {postList.map((e) => {
            return (
              <Styled.StyledContentList key={e.id}>
                <UserInfo
                  username={e.author.username}
                  accountId={e.author.account_id}
                  feedList={true}
                  profileImg={e.author.profile_image}
                  to={`/profile/${e.author.account_id}`}
                  feedData={e.author}
                  is_farm_verified={e.author_is_farm_verified}
                />
                <PostContent
                  content={e.content}
                  images={e.image_urls}
                  date={e.created_at}
                  id={e.id}
                  like={e.like_count}
                  isLiked={e.is_liked}
                  comment={e.comment_count}
                />
              </Styled.StyledContentList>
            );
          })}
        </ul>
      ) : (
        <Styled.NoList>
          <CameraIcon size={'4rem'} />
          게시물 없음
        </Styled.NoList>
      )}

      {/* 추가 로딩 표시 */}
      {isLoading && !isInitialLoad && (
        <div style={{ textAlign: 'center', padding: '20px' }}>
          <LoadingComponent />
        </div>
      )}
    </>
  );
};

export default PostList;
