import { Link } from 'react-router-dom';
import * as Styled from './UserInfo.style';
import defaultProfileImg from './../../assets/images/defaultProfileImg.png'; //기본프로필이미지
import { EllipsisVerticalIcon } from '../icon/Icons';
import Badge from '../badge/Badge';
import useFeedActions from '../../hooks/useFeedActions';
import { useState } from 'react';
import { toggleFollow } from '../../api/userApi';

const UserInfo = ({
  profile_image,
  profileImg, // profileImg prop 추가
  username,
  accountId,
  highlightQuery = '',
  withLink = false,
  to,
  btns,
  feedList = false,
  is_farm_verified = false,
  onFollowToggle,
  feedData = null, // 전체 피드 데이터 객체
  userId = null, // 게시물 작성자 ID (대안으로 사용)
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const highlightMatch = (text) => {
    if (!text || !highlightQuery) return text || '';

    const regex = new RegExp(`(${highlightQuery})`, 'gi');
    console.log('highlight:', text.split(regex));
    return text
      .split(regex)
      .map((part, i) =>
        regex.test(part) ? <Styled.Highlight key={i}>{part}</Styled.Highlight> : part
      );
  };

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

  // 실제 피드 데이터 구성
  const getFeedDataForAction = () => {
    // feedData가 있으면 그대로 사용
    if (feedData) {
      return feedData;
    }

    // feedData가 없으면 props로부터 구성
    return {
      userId: userId || accountId, // userId가 없으면 accountId를 사용
      username,
      profile_image,
      accountId,
      // 필요한 경우 추가 데이터
    };
  };

  const follwHandler = async () => {
    if (isLoading) return;
    try {
      setIsLoading(true);
      // API 호출
      const result = await toggleFollow(accountId);

      // 성공 시 부모 컴포넌트에 알림
      if (onFollowToggle) {
        onFollowToggle(accountId, result); // accountId와 결과를 전달
      }
    } catch (error) {
      console.error('팔로우/언팔로우 처리 중 오류:', error);
      alert('팔로우 처리 중 오류가 발생했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Styled.UserInfoLayout to={to}>
        <Styled.ProfileBox>
          {profile_image || profileImg ? (
            <img src={profile_image || profileImg} alt="프로필이미지" />
          ) : (
            <img src={defaultProfileImg} alt="기본 프로필이미지" />
          )}
        </Styled.ProfileBox>

        {withLink ? <Link to={to}>{nameContent}</Link> : nameContent}
      </Styled.UserInfoLayout>

      {feedList ? (
        <Styled.MoreBtn onClick={() => handleFeedAction('openFeedMenu', getFeedDataForAction())}>
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
          <Styled.FollwerLineBtn
            padding={'.7rem 1.1rem'}
            radius={'xsmall'}
            fontSize={'small'}
            onClick={follwHandler}
          >
            취소
          </Styled.FollwerLineBtn>
        ))}
    </>
  );
};

export default UserInfo;
