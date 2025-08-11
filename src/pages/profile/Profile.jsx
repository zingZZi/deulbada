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
  console.log(userInfo);
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
        const user = await fetchUser(user_name);
        const products = await getProductUser(user_name);
        const feedData = await fetchPosts();
        // 컴포넌트가 언마운트되지 않았을 때만 상태 업데이트
        if (isMounted) {
          setUserInfo(user?.data?.results || []);
          setUserProduct(products?.data?.results || []);
          setUserFeed(feedData?.data?.results || []);
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
  return (
    <Styled.ProfileBg>
      {/* 상단프로필정보 */}
      <ProfileInfo user_name={user_name} isMyProfile={false} />
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
