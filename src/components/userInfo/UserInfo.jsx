/* eslint-disable no-unused-vars */
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
  followState,
  feedList = false,
  is_farm_verified = false,
  onFollowToggle,
  feedData = null, // 전체 피드 데이터 객체
  userId = null, // 게시물 작성자 ID (대안으로 사용)
  onPostDeleted = null, // 🔥 게시글 삭제 콜백 함수 추가
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const highlightMatch = (text) => {
    if (!text || !highlightQuery) return text || '';
    const regex = new RegExp(`(${highlightQuery})`, 'gi');
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
    // feedData가 있으면 그대로 사용 (전체 게시글 데이터)
    if (feedData) {
      return feedData;
    }

    // feedData가 없으면 props로부터 구성
    return {
      userId: userId || accountId,
      username,
      profile_image,
      accountId,
      author: {
        account_id: accountId,
        username,
        profile_image: profile_image || profileImg,
      },
    };
  };

  const follwHandler = async () => {
    if (isLoading) return;
    try {
      setIsLoading(true);
      const result = await toggleFollow(accountId);

      if (onFollowToggle) {
        onFollowToggle(accountId); // result 제거, accountId만 전달
      }
    } catch (error) {
      console.error('팔로우/언팔로우 처리 중 오류:', error);
      alert('팔로우 처리 중 오류가 발생했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  const localaccountId = localStorage.getItem('account_id');
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
        <>
          {accountId === localaccountId ? (
            <Styled.MoreBtn
              onClick={() =>
                handleFeedAction('openFeedMenu', getFeedDataForAction(), onPostDeleted)
              }
            >
              {/* 🔥 handleFeedAction에 콜백 함수 전달 */}
              <EllipsisVerticalIcon size={'1.8rem'} />
              <span className="text-ir">더보기</span>
            </Styled.MoreBtn>
          ) : (
            <></>
          )}
        </>
      ) : null}

      {btns &&
        (followState ? (
          <Styled.FollwerLineBtn
            padding={'.7rem 1.1rem'}
            radius={'xsmall'}
            fontSize={'small'}
            onClick={follwHandler}
            disabled={isLoading}
          >
            {isLoading ? '처리중...' : '취소'}
          </Styled.FollwerLineBtn>
        ) : (
          <Styled.FollwerBtn
            padding={'.7rem 1.1rem'}
            radius={'xsmall'}
            fontSize={'small'}
            onClick={follwHandler}
            disabled={isLoading}
          >
            {isLoading ? '처리중...' : '팔로잉'}
          </Styled.FollwerBtn>
        ))}
    </>
  );
};

export default UserInfo;
