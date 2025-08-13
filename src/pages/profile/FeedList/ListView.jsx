import * as Styled from './../Profille.style';
import UserInfo from '../../../components/userInfo/UserInfo';
import PostContent from '../../../components/PostContent/PostContent';
import { useState } from 'react';
const ListView = ({ userFeed: initialUserFeed }) => {
  // 🔥 userFeed를 state로 관리
  const [userFeed, setUserFeed] = useState(initialUserFeed);

  // 🔥 게시글 삭제 후 상태에서 제거하는 함수
  const removePostFromList = (postId) => {
    setUserFeed((prevList) => prevList.filter((post) => post.id !== postId));
  };
  return (
    <>
      <Styled.FeedList>
        {userFeed.map((e) => {
          return (
            <li key={e.id}>
              <UserInfo
                id={e.id}
                username={e.author.username}
                accountId={e.author.account_id}
                feedList={true}
                profileImg={e.author.profile_image}
                to={`/profile/${e.author.account_id}`}
                feedData={e}
                is_farm_verified={e.author_is_farm_verified}
                onPostDeleted={removePostFromList}
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
            </li>
          );
        })}
      </Styled.FeedList>
    </>
  );
};
export default ListView;
