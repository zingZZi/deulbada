import UserInfo from '../../components/userInfo/UserInfo';
import * as Styled from './Followings.style';
import { useEffect, useState } from 'react';
import { fetchFollowing } from '../../api/userApi';
import { useParams } from 'react-router-dom';

const Followings = () => {
  const { user_name } = useParams();
  const [followeing, setFolloweing] = useState([]);

  useEffect(() => {
    const getFollowing = async () => {
      try {
        const response = await fetchFollowing(user_name);
        setFolloweing(response.data.results);
      } catch (error) {
        console.error('Followers 불러오지 못했습니다.', error);
      }
    };
    getFollowing();
  }, [user_name]);

  // 팔로우 취소 핸들러
  const handleFollowToggle = (accountId) => {
    setFolloweing((prev) => prev.filter((user) => user.account_id !== accountId));
  };
  return (
    <Styled.List>
      {followeing.map((e) => {
        return (
          <Styled.Item key={e.id}>
            <UserInfo
              username={e.username}
              accountId={e.account_id}
              profile_image={e.profile_image} // 프로필 이미지도 추가
              btns="follower" // "follower"에서 "followings"로 변경 (취소 버튼 표시용)
              onFollowToggle={handleFollowToggle} // 콜백 함수 전달
            />
          </Styled.Item>
        );
      })}
    </Styled.List>
  );
};

export default Followings;
