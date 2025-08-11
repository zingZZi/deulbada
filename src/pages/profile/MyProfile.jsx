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

const MyProfile = () => {
  const { user_name } = useParams();
  const [loading, setLoading] = useState(true);
  const [userProduct, setUserProduct] = useState([]);
  const [userFeed, setUserFeed] = useState([]);
  const [feedType, setFeedType] = useState('list');

  useProfileRedirect(user_name);

  function feedTypeHandler(e) {
    setFeedType(e.currentTarget.dataset.type);
  }

  // 현재 사용자 ID 가져오는 함수
  const getCurrentUserId = () => {
    return localStorage.getItem('user_name');
  };

  useEffect(() => {
    let isMounted = true;

    const getProfileData = async () => {
      try {
        setLoading(true);
        // 현재 사용자 정보 결정
        // 1. URL 파라미터가 있으면 사용 (리다이렉트 전)
        // 2. 없으면 localStorage에서 가져오기 (리다이렉트 후)
        const targetUserId = user_name || getCurrentUserId();
        console.log('프로필 데이터 로드:', {
          url_user_name: user_name,
          localStorage_id: getCurrentUserId(),
          target: targetUserId,
        });
        if (!targetUserId) {
          console.error('사용자 ID를 찾을 수 없습니다');
          return;
        }
        // API 호출
        const products = await getProductUser(targetUserId);
        const feedData = await fetchPosts();
        console.log('API 응답:', { products, feedData });
        if (isMounted) {
          setUserProduct(products?.data?.results || []);
          setUserFeed(feedData?.data?.results || []);
        }
      } catch (error) {
        console.error('프로필페이지 정보를 불러오지 못했습니다.', error);
        if (isMounted) {
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
    return () => {
      isMounted = false;
    };
  }, [user_name]); // user_name이 변경될 때마다 실행

  // 로딩 중일 때 로딩 메시지만 표시
  if (loading) {
    return <LoadingComponent />;
  }

  // 현재 표시할 사용자 이름 결정
  const displayUserName = user_name || getCurrentUserId();
  return (
    <Styled.ProfileBg>
      {/* 상단프로필정보 */}
      <ProfileInfo user_name={displayUserName} isMyProfile={true} />

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

export default MyProfile;
