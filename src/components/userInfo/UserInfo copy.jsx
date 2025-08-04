import { Link } from 'react-router-dom';
import * as Styled from './UserInfo.style';
import sampleImage from './../../assets/images/sample.png'; //추후 개발붙으면 지워야함

const UserInfo = ({ as = 'div', ...props }) => {
  return (
    <Styled.UserInfoLayout as={as} {...props}>
      <Styled.ProfileBox>
        <img src={sampleImage} alt="샘플이미지" />
      </Styled.ProfileBox>
      <Link to="">
        <Styled.UserName>서귀포시 한라봉 타운</Styled.UserName>
        <Styled.UserId>@ weniv_Mandarin</Styled.UserId>
      </Link>
    </Styled.UserInfoLayout>
  );
};
export default UserInfo;
