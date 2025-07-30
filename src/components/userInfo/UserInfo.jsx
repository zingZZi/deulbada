import { Link } from 'react-router-dom';
import sampleImage from './../../assets/images/sample.png'; //추후 개발붙으면 지워야함
import { StyledUserInfo, StyledProfileBox, StyledUserName, StyledUserId } from './UserInfo.style';

const UserInfo = ({ as = 'div', ...props }) => {
  return (
    <StyledUserInfo as={as} {...props}>
      <StyledProfileBox>
        <img src={sampleImage} alt="샘플이미지" />
      </StyledProfileBox>
      <Link to="">
        <StyledUserName>서귀포시 한라봉 타운</StyledUserName>
        <StyledUserId>@ weniv_Mandarin</StyledUserId>
      </Link>
    </StyledUserInfo>
  );
};
export default UserInfo;
