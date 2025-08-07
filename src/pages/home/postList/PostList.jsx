import { useEffect, useState } from 'react';
import * as Styled from './PostList.style';
import { fetchPosts } from '../../../api/postApi';
import UserInfo from '../../../components/userInfo/UserInfo';
import PostContent from '../../../components/postContent/PostContent';

const PostList = () => {
  const [postList, setPostList] = useState([]);
  useEffect(() => {
    const getPost = async () => {
      try {
        const response = await fetchPosts();
        setPostList(response.data);
      } catch (error) {
        console.error('Post를 불러오지 못했습니다.', error);
      }
    };
    getPost();
  }, []);
  return (
    <ul>
      {postList.map((e) => {
        return (
          <Styled.StyledContentList key={e.id}>
            <UserInfo
              username={e.username}
              accountId={e.account_id}
              feedList={true}
              profileImg={e.profile_image}
              to={`/profile/${e.account_id}`}
            />
            <PostContent contet={e.content} images={e.image_urls} date={e.created_at} id={e.id} />
          </Styled.StyledContentList>
        );
      })}
    </ul>
  );
};

export default PostList;
