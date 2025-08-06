import UserInfo from '../../components/userInfo/UserInfo';
import * as Styled from './Followings.style';
const Followings = () => {
  return (
    <Styled.List>
      <Styled.Item>
        <UserInfo username="test" accountId="testest" btns="follower" />
      </Styled.Item>
      <Styled.Item>
        <UserInfo username="test" accountId="testest" btns="follower" />
      </Styled.Item>
    </Styled.List>
  );
};

export default Followings;
