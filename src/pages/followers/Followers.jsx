import * as Styled from './Followers.style';
import UserInfo from '../../components/userInfo/UserInfo';

const Followers = () => {
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
