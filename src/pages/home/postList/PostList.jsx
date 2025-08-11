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
  const [loading, setLoading] = useState(true);
  const isBottom = useScrollObserver();

  console.log(isBottom);

  useEffect(() => {
    let isMounted = true; // cleanup을 위한 플래그

    const getPost = async () => {
      try {
        setLoading(true);
        const response = await fetchPosts();

        // 컴포넌트가 언마운트되지 않았을 때만 상태 업데이트
        if (isMounted) {
          setPostList(response.data.results || []);
        }
      } catch (error) {
        console.error('Post를 불러오지 못했습니다.', error);
        if (isMounted) {
          setPostList([]);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    getPost();

    // cleanup 함수 - 컴포넌트 언마운트 시 실행
    return () => {
      isMounted = false;
    };
  }, []);

  // 로딩 중일 때 로딩 컴포넌트 표시
  if (loading) {
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
                  username={e.username}
                  accountId={e.account_id}
                  feedList={true}
                  profileImg={e.profile_image}
                  to={`/profile/${e.username}`}
                  feedData={e}
                />
                <PostContent
                  contet={e.content}
                  images={e.image_urls}
                  date={e.created_at}
                  id={e.id}
                />
              </Styled.StyledContentList>
            );
          })}
        </ul>
      ) : (
        <Styled.NoList>
          <CameraIcon size={'6rem'} />
          게시물 없음
        </Styled.NoList>
      )}
    </>
  );
};

export default PostList;
