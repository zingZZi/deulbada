import { Link } from 'react-router-dom';
import * as Styled from './UserInfo.style';
import sampleImage from './../../assets/images/sample.png'; //추후 개발붙으면 지워야함

const UserInfo = ({
  username,
  accountId,
  highlightQuery = '',
  withLink = false,
  to = '/profile',
}) => {
  const highlightMatch = (text) => {
    if (!highlightQuery) return text;
    const regex = new RegExp(`(${highlightQuery})`, 'gi');
    console.log('highlight:', text.split(regex));

    return text
      .split(regex)
      .map((part, i) =>
        regex.test(part) ? <Styled.Highlight key={i}>{part}</Styled.Highlight> : part
      );
  };

  const nameContent = (
    <div>
      <Styled.UserName>{highlightMatch(username)}</Styled.UserName>
      <Styled.UserId>@{highlightMatch(accountId)}</Styled.UserId>
    </div>
  );

  return (
    <Styled.UserInfoLayout to={to}>
      <Styled.ProfileBox>
        <img src={sampleImage} alt="프로필이미지" />
      </Styled.ProfileBox>

      {withLink ? <Link to={to}>{nameContent}</Link> : nameContent}
    </Styled.UserInfoLayout>
  );
};

export default UserInfo;
