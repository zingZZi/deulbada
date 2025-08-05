import { Link } from 'react-router-dom';
import * as Styled from './UserInfo.style';
import sampleImage from './../../assets/images/sample.png'; //추후 개발붙으면 지워야함
import { BasicBtn, LineBtn } from '../../styles/Button.style';
import Badge from '../badge/Badge';

const UserInfo = ({
  username,
  accountId,
  highlightQuery = '',
  withLink = false,
  to = '/profile',
  btns,
  is_farm_verified = false,
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
      <Styled.UserName>
        {highlightMatch(username)}
        {is_farm_verified ? <Badge is_farm_verified={is_farm_verified} /> : null}
      </Styled.UserName>
      <Styled.UserId>@{highlightMatch(accountId)}</Styled.UserId>
    </div>
  );

  return (
    <>
      <Styled.UserInfoLayout to={to}>
        <Styled.ProfileBox>
          <img src={sampleImage} alt="프로필이미지" />
        </Styled.ProfileBox>

        {withLink ? <Link to={to}>{nameContent}</Link> : nameContent}
      </Styled.UserInfoLayout>
      {btns &&
        (btns === 'followings' ? (
          <Styled.FollwerBtn padding={'.7rem 1.1rem'} radius={'xsmall'} fontSize={'small'}>
            팔로잉
          </Styled.FollwerBtn>
        ) : (
          <Styled.FollwerLineBtn padding={'.7rem 1.1rem'} radius={'xsmall'} fontSize={'small'}>
            취소
          </Styled.FollwerLineBtn>
        ))}
    </>
  );
};

export default UserInfo;
