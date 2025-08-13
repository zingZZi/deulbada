import UserInfo from '../../components/userInfo/UserInfo';
import * as Styled from './Followings.style';
import { useEffect, useState } from 'react';
import { fetchFollowing } from '../../api/userApi';
import { useParams } from 'react-router-dom';

const Followings = () => {
  const { accountId } = useParams();
  const [followeing, setFolloweing] = useState([]);
  const [currentUserAccountId, setCurrentUserAccountId] = useState(null);

  // 로컬스토리지에서 현재 사용자 정보 가져오기
  useEffect(() => {
    const getCurrentUser = () => {
      try {
        const accountId = localStorage.getItem('account_id');
        setCurrentUserAccountId(accountId);
      } catch (error) {
        console.error('로컬스토리지에서 사용자 정보를 가져오는데 실패했습니다:', error);
      }
    };

    getCurrentUser();
  }, []);

  useEffect(() => {
    const getFollowing = async () => {
      try {
        const response = await fetchFollowing(accountId);
        setFolloweing(response.data.results);
      } catch (error) {
        console.error('Following 불러오지 못했습니다.', error);
      }
    };
    getFollowing();
  }, [accountId]);

  // 팔로우 상태 변경 핸들러 (리스트에서 삭제하지 않고 상태만 변경)
  const handleFollowToggle = (accountId) => {
    setFolloweing((prev) =>
      prev.map((user) =>
        user.account_id === accountId
          ? { ...user, is_following: !user.is_following } // 상태만 토글
          : user
      )
    );
  };

  return (
    <Styled.List>
      {followeing.map((e) => {
        // 현재 사용자인지 확인
        const isCurrentUser = e.account_id === currentUserAccountId;

        return (
          <Styled.Item key={e.id}>
            <UserInfo
              username={e.username}
              accountId={e.account_id}
              profile_image={e.profile_image}
              to={`/profile/${e.account_id}`}
              btns={!isCurrentUser} // 본인이면 false, 다른 사람이면 true
              followState={e.is_following}
              onFollowToggle={handleFollowToggle}
            />
          </Styled.Item>
        );
      })}
    </Styled.List>
  );
};

export default Followings;
