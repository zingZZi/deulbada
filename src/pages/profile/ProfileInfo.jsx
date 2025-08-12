import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import * as Styled from './ProfileInfo.style';
import { BasicBtn, LineBtn, LineLink } from '../../styles/Button.style';
import { MessageCircleIcon, Share2Icon } from '../../components/icon/Icon.style';
import { toggleFollow } from '../../api/userApi'; // API 파일 경로에 맞게 수정
import defaultProfileImg from './../../assets/images/defaultProfileImg.png';

const ProfileInfo = ({ user_name, isMyProfile, userInfo }) => {
  // 팔로우 상태와 팔로워 수를 로컬 상태로 관리
  const [isFollowing, setIsFollowing] = useState(false);
  const [followerCount, setFollowerCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  console.log('userInfo:', userInfo);

  // userInfo가 변경될 때마다 로컬 상태 업데이트
  useEffect(() => {
    if (userInfo && Object.keys(userInfo).length > 0) {
      setIsFollowing(userInfo.is_following || false);
      setFollowerCount(userInfo.follower_count || 0);
    }
  }, [userInfo]);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: userInfo.user_name || userInfo.username,
          text: userInfo.introduction || '프로필을 확인해보세요!',
          url: window.location.href,
        });
      } catch (error) {
        console.log(error);
      }
    } else {
      // fallback 처리
      alert('이 브라우저는 공유 기능을 지원하지 않습니다');
    }
  };

  const followHandler = async () => {
    if (isLoading) return; // 중복 요청 방지

    try {
      setIsLoading(true);

      // API 호출
      await toggleFollow(userInfo.account_id);

      // 상태 업데이트
      if (isFollowing) {
        // 언팔로우인 경우
        setIsFollowing(false);
        setFollowerCount((prev) => Math.max(0, prev - 1)); // 음수 방지
      } else {
        // 팔로우인 경우
        setIsFollowing(true);
        setFollowerCount((prev) => prev + 1);
      }
    } catch (error) {
      console.error('팔로우/언팔로우 처리 중 오류:', error);
      // 에러 처리 (토스트나 알럿 등)
      alert('팔로우 처리 중 오류가 발생했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  // userInfo가 없거나 비어있으면 로딩 상태 표시
  if (!userInfo || Object.keys(userInfo).length === 0) {
    return (
      <Styled.ProfileInfo>
        <div style={{ padding: '20px', textAlign: 'center' }}>프로필 정보를 불러오는 중...</div>
      </Styled.ProfileInfo>
    );
  }

  return (
    <Styled.ProfileInfo>
      <h2 className="text-ir">프로필 정보 영역입니다.</h2>
      <Styled.profileSmmary>
        <Styled.followInfo>
          <Link to={`/followers/${user_name}`}>
            <b>{followerCount}</b>
            followers
          </Link>
        </Styled.followInfo>
        <li>
          <Styled.ProfileImgWrap>
            {userInfo.profile_image ? (
              <img src={`http://43.201.70.73/${userInfo.profile_image}`} alt="프로필이미지" />
            ) : (
              <img src={defaultProfileImg} alt="기본 프로필이미지" />
            )}
          </Styled.ProfileImgWrap>
        </li>
        <Styled.followInfo>
          <Link to={`/followings/${user_name}`}>
            <b>{userInfo.following_count || 0}</b>
            followings
          </Link>
        </Styled.followInfo>
      </Styled.profileSmmary>
      <Styled.UserName>
        {userInfo.username}
        {userInfo.is_farm_owner && (
          <Styled.OwnerMark>
            <span className="text-ir">인증받은 유저입니다</span>
          </Styled.OwnerMark>
        )}
      </Styled.UserName>
      <Styled.UserId>@ {userInfo.account_id}</Styled.UserId>
      {userInfo.introduction ? <Styled.UserBio>{userInfo.introduction}</Styled.UserBio> : null}

      {isMyProfile ? (
        <Styled.ProfileActions>
          <li>
            <LineLink
              radius={'medium'}
              padding={'.8rem 2.6rem'}
              fontSize={'base'}
              to="/profile/edit"
            >
              프로필 수정
            </LineLink>
          </li>
          <li>
            <LineLink radius={'medium'} padding={'.8rem 2.6rem'} fontSize={'base'}>
              상품등록
            </LineLink>
          </li>
        </Styled.ProfileActions>
      ) : (
        <Styled.ProfileActions>
          <li>
            <LineLink to="" radius={'round'} padding={'.7rem'} fontSize={'icon'}>
              <span className="text-ir">채팅하기</span>
              <MessageCircleIcon />
            </LineLink>
          </li>
          <li>
            {isFollowing ? (
              <LineBtn
                radius={'medium'}
                padding={'.7rem 4rem'}
                fontSize={'base'}
                onClick={followHandler}
                disabled={isLoading}
              >
                {isLoading ? '처리중...' : '언팔로우'}
              </LineBtn>
            ) : (
              <BasicBtn
                radius={'medium'}
                padding={'.7rem 4rem'}
                fontSize={'base'}
                onClick={followHandler}
                disabled={isLoading}
              >
                {isLoading ? '처리중...' : '팔로우'}
              </BasicBtn>
            )}
          </li>
          <li>
            <LineBtn radius={'round'} padding={'.7rem'} fontSize={'icon'} onClick={handleShare}>
              <Share2Icon />
              <span className="text-ir">공유하기</span>
            </LineBtn>
          </li>
        </Styled.ProfileActions>
      )}
    </Styled.ProfileInfo>
  );
};

export default ProfileInfo;
