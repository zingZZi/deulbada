import * as Styled from './Followers.style';
import UserInfo from '../../components/userInfo/UserInfo';
import { useEffect, useState } from 'react';
import { fetchFollowers } from '../../api/userApi';
import { useParams } from 'react-router-dom';

const Followers = () => {
  const { user_name } = useParams();
  const [followers, setFollowers] = useState([]);
  useEffect(() => {
    const getFollowers = async () => {
      try {
        const response = await fetchFollowers(user_name);
        setFollowers(response.data.results);
      } catch (error) {
        console.error('Followers 불러오지 못했습니다.', error);
      }
    };
    getFollowers();
  }, [user_name]);
  console.log(followers);
  return (
    <Styled.List>
      {followers.length === 0 ? (
        <>갯수없다잉</>
      ) : (
        <>
          {followers.map((e) => {
            return (
              <Styled.Item key={e.id}>
                <UserInfo
                  username={e.username}
                  accountId={e.account_id}
                  btns={true}
                  followState={e.is_following}
                  profile_image={e.profile_image}
                  to={`/profile/${e.account_id}`}
                />
              </Styled.Item>
            );
          })}
        </>
      )}
    </Styled.List>
  );
};
export default Followers;
