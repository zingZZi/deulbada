import * as Styled from './Profille.style';
import ProfileInfo from './ProfileInfo';
import SellProduct from './SellProduct';
import { LayoutGridIcon, LayoutListIcon } from '../../components/icon/Icon.style';
import ListView from './FeedList/ListView';
import GalleryView from './FeedList/GalleryView';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getProductUser } from '../../api/productApi';
import LoadingComponent from '../../components/loding/Loding';
import { fetchPosts } from '../../api/postApi';
import useProfileRedirect from '../../hooks/useProfileRedirect';
import { fetchUser } from '../../api/userApi';

const Profile = () => {
  const { user_name } = useParams();
  const [loading, setLoading] = useState(true);
  const [userInfo, setUserInfo] = useState([]);
  const [userProduct, setUserProduct] = useState([]);
  const [userFeed, setUserFeed] = useState([]);
  const [feedType, setFeedType] = useState('list');

  useProfileRedirect(user_name);

  function feedTypeHandler(e) {
    setFeedType(e.currentTarget.dataset.type);
  }

  console.log('🔍 URL에서 가져온 user_name:', user_name);

  useEffect(() => {
    // user_name이 없으면 조기 반환
    if (!user_name) {
      setLoading(false);
      return;
    }

    let isMounted = true; // cleanup을 위한 플래그

    const getProfileData = async () => {
      try {
        setLoading(true);

        // MyProfile과 동일한 방식으로 Promise.allSettled 사용
        const [userResponse, productsResponse, feedResponse] = await Promise.allSettled([
          fetchUser(user_name),
          getProductUser(user_name),
          fetchPosts(), // 전체 피드 가져오기
        ]);

        // 컴포넌트가 언마운트되지 않았을 때만 상태 업데이트
        if (isMounted) {
          // 사용자 정보 처리 (MyProfile과 동일한 방식)
          if (userResponse.status === 'fulfilled') {
            console.log('✅ 사용자 정보 응답:', userResponse.value);
            setUserInfo(userResponse.value?.data?.results || userResponse.value?.data || []);
          } else {
            console.error('사용자 정보 로드 실패:', userResponse.reason);
            setUserInfo([]);
          }

          // 상품 정보 처리
          if (productsResponse.status === 'fulfilled') {
            console.log('✅ 상품 정보 응답:', productsResponse.value);
            setUserProduct(productsResponse.value?.data?.results || []);
          } else {
            console.error('상품 정보 로드 실패:', productsResponse.reason);
            setUserProduct([]);
          }

          // 피드 정보 처리 (특정 사용자 피드 필터링)
          if (feedResponse.status === 'fulfilled') {
            console.log('✅ 피드 정보 응답:', feedResponse.value);
            const allFeeds = feedResponse.value?.data?.results || [];
            const userSpecificFeeds = allFeeds.filter(
              (feed) => feed.author === user_name || feed.user === user_name
            );
            setUserFeed(userSpecificFeeds);
          } else {
            console.error('피드 정보 로드 실패:', feedResponse.reason);
            setUserFeed([]);
          }
        }
      } catch (error) {
        console.error('프로필페이지 정보를 불러오지 못했습니다.', error);
        if (isMounted) {
          setUserInfo([]);
          setUserProduct([]);
          setUserFeed([]);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    getProfileData();

    // cleanup 함수 - 컴포넌트 언마운트나 의존성 변경 시 실행
    return () => {
      isMounted = false;
    };
  }, [user_name]);

  // 로딩 중일 때 로딩 메시지만 표시
  if (loading) {
    return <LoadingComponent />;
  }

  // user_name이 없을 때
  if (!user_name) {
    return (
      <Styled.ProfileBg>
        <div style={{ padding: '20px', textAlign: 'center' }}>
          <h2>사용자를 찾을 수 없습니다</h2>
        </div>
      </Styled.ProfileBg>
    );
  }

  return (
    <Styled.ProfileBg>
      {/* 상단프로필정보 */}
      <ProfileInfo user_name={user_name} isMyProfile={false} userInfo={userInfo} />

      {/* 판매중인 상품영역 / 제품있을시에만 노출 */}
      {userProduct.length > 0 && <SellProduct userProduct={userProduct} />}

      {/* 피드영역 */}
      <Styled.FeedSection>
        <h2 className="text-ir">피드리스트 입니다.</h2>
        <Styled.FeedTypeBtns>
          <Styled.FeedTypeItems data-type="list" onClick={feedTypeHandler}>
            <LayoutListIcon size={26} className={feedType === 'list' ? 'active' : null} />
            <span className="text-ir">리스트형</span>
          </Styled.FeedTypeItems>
          <Styled.FeedTypeItems onClick={feedTypeHandler} data-type="gallery">
            <LayoutGridIcon size={26} className={feedType === 'gallery' ? 'active' : null} />
            <span className="text-ir">갤러리형</span>
          </Styled.FeedTypeItems>
        </Styled.FeedTypeBtns>

        {/* 피드 리스트 영역 */}
        {feedType === 'list' && <ListView userFeed={userFeed} />}
        {feedType === 'gallery' && <GalleryView userFeed={userFeed} />}
      </Styled.FeedSection>
    </Styled.ProfileBg>
  );
};

export default Profile;
