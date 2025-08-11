import { Link } from 'react-router-dom';
import * as Styled from './ProfileInfo.style';
import { BasicBtn, LineBtn, LineLink } from '../../styles/Button.style';
import { MessageCircleIcon, Share2Icon } from '../../components/icon/Icon.style';
import sampleImage from './../../assets/images/sample.png'; //추후 개발붙으면 지워야함
const ProfileInfo = ({ user_name, isMyProfile }) => {
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: '{username}',
          text: '{한줄말}',
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
  return (
    <Styled.ProfileInfo>
      <h2 className="text-ir">프로필 정보 영역입니다.</h2>
      <Styled.profileSmmary>
        <Styled.followInfo>
          <Link to={`/followers/${user_name}`}>
            <b>2950</b>
            followers
          </Link>
        </Styled.followInfo>
        <li>
          <Styled.ProfileImgWrap>
            <img src={sampleImage} alt="샘플이미지" />
          </Styled.ProfileImgWrap>
        </li>
        <Styled.followInfo>
          <Link to={`/followings/${user_name}`}>
            <b>2950</b>
            followings
          </Link>
        </Styled.followInfo>
      </Styled.profileSmmary>
      <Styled.UserName>
        애월읍 위니브 감귤농장
        <i>
          <span className="text-ir">인증받은 유저입니다</span>
        </i>
      </Styled.UserName>
      <Styled.UserId>@ weniv_Mandarin</Styled.UserId>
      <Styled.UserBio>애월읍 감귤 전국 배송, 귤따기 체험, 감귤 농장</Styled.UserBio>

      {isMyProfile ? (
        <Styled.ProfileActions>
          <li>
            <LineLink radius={'medium'} padding={'.8rem 2.6rem'} fontSize={'base'}>
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
            <BasicBtn radius={'medium'} padding={'.7rem 4rem'} fontSize={'base'}>
              팔로우
            </BasicBtn>
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
