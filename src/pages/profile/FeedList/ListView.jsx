import * as Styled from './../Profille.style';
import UserInfo from '../../../components/userInfo/UserInfo';
import PostContent from '../../../components/PostContent/PostContent';
const ListView = ({ userFeed }) => {
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
                to={`/profile/${e.username}`}
                feedData={e}
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
            </li>
          );
        })}
      </Styled.FeedList>
    </>
  );
};
export default ListView;
