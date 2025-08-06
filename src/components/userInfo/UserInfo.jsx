import { Link } from 'react-router-dom';
import * as Styled from './UserInfo.style';
import sampleImage from './../../assets/images/sample.png'; //추후 개발붙으면 지워야함
import { EllipsisVerticalIcon } from '../icon/Icons';
import Badge from '../badge/Badge';
import useFeedActions from '../../hooks/useFeedActions';

const UserInfo = ({
  profile_image,
  username,
  accountId,
  highlightQuery = '',
  withLink = false,
  to = '/profile',
  btns,
  feedList = false,
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
  console.log(profile_image);
  const nameContent = (
    <Styled.InfoBox>
      <Styled.UserName>
        {highlightMatch(username)}
        {is_farm_verified ? <Badge is_farm_verified={is_farm_verified} /> : null}
      </Styled.UserName>
      <Styled.UserId>@{highlightMatch(accountId)}</Styled.UserId>
    </Styled.InfoBox>
  );
  const { handleFeedAction } = useFeedActions();
  return (
    <>
      <Styled.UserInfoLayout to={to}>
        <Styled.ProfileBox>
          {profile_image ? (
            <img src={profile_image} alt="프로필이미지" />
          ) : (
            <img src={sampleImage} alt="기본 프로필이미지" />
          )}
        </Styled.ProfileBox>

        {withLink ? <Link to={to}>{nameContent}</Link> : nameContent}
      </Styled.UserInfoLayout>
      {feedList ? (
        <Styled.MoreBtn onClick={() => handleFeedAction('openFeedMenu', 'feedData')}>
          <EllipsisVerticalIcon size={'1.8rem'} />
          <span className="text-ir">더보기</span>
        </Styled.MoreBtn>
      ) : null}
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
