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
      <Styled.Item>
        <UserInfo username="test" accountId="testest" btns="followings" />
      </Styled.Item>
      <Styled.Item>
        <UserInfo username="test" accountId="testest" btns="follower" />
      </Styled.Item>
    </Styled.List>
  );
};
export default Followers;
