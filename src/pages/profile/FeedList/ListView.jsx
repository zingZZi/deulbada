import * as Styled from './../Profille.style';
import UserInfo from '../../../components/userInfo/UserInfo';
import PostContent from '../../../components/PostContent/PostContent';
import { useScrollObserver } from '../../../hooks/useScrollObserver';
const ListView = ({ userFeed }) => {
  const isBottom = useScrollObserver();
  console.log(isBottom);
  return (
    <>
      <Styled.FeedList>
        {userFeed.map((e) => {
          return (
            <li key={e.id}>
              <UserInfo
                username={e.username}
                accountId={e.account_id}
                feedList={true}
                profileImg={e.profile_image}
                to={`/profile/${e.username}`}
                feedData={e}
              />
              <PostContent contet={e.content} images={e.image_urls} date={e.created_at} id={e.id} />
            </li>
          );
        })}
      </Styled.FeedList>
    </>
  );
};
export default ListView;
