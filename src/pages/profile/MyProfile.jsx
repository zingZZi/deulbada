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

const MyProfile = () => {
  const { user_name: paramUserName } = useParams();
  const [loading, setLoading] = useState(true);
  const [userInfo, setUserInfo] = useState([]);
  const [userProduct, setUserProduct] = useState([]);
  const [userFeed, setUserFeed] = useState([]);
  const [feedType, setFeedType] = useState('list');

  console.log(userProduct);

  // URL 파라미터로부터 온 user_name 또는 로컬 스토리지에서 가져오기
  const getTargetUserName = () => {
    return paramUserName || localStorage.getItem('user_name');
  };

  const targetUserName = getTargetUserName();
  useProfileRedirect(targetUserName);
  const feedTypeHandler = (e) => {
    setFeedType(e.currentTarget.dataset.type);
  };

  useEffect(() => {
    let isMounted = true;

    const getProfileData = async () => {
      try {
        setLoading(true);

        if (!targetUserName) {
          console.error('사용자 이름을 찾을 수 없습니다.');
          return;
        }

        // 병렬로 API 호출
        const [userResponse, productsResponse, feedResponse] = await Promise.allSettled([
          fetchUser(targetUserName),
          getProductUser(targetUserName),
          fetchPosts(targetUserName), // 특정 사용자의 피드만 가져오기 (API에 따라 파라미터 추가 필요)
        ]);

        if (isMounted) {
          // 사용자 정보 처리
          if (userResponse.status === 'fulfilled') {
            setUserInfo(userResponse.value?.data?.results || userResponse.value?.data || []);
          } else {
            console.error('사용자 정보 로드 실패:', userResponse.reason);
            setUserInfo([]);
          }

          // 상품 정보 처리
          if (productsResponse.status === 'fulfilled') {
            setUserProduct(productsResponse.value?.data?.results || []);
          } else {
            console.error('상품 정보 로드 실패:', productsResponse.reason);
            setUserProduct([]);
          }

          // 피드 정보 처리
          if (feedResponse.status === 'fulfilled') {
            // 특정 사용자의 피드만 필터링 (API에서 직접 필터링되지 않는 경우)
            const allFeeds = feedResponse.value?.data?.results || [];
            const userSpecificFeeds = allFeeds.filter(
              (feed) => feed.author === targetUserName || feed.user === targetUserName
            );
            setUserFeed(userSpecificFeeds);
          } else {
            console.error('피드 정보 로드 실패:', feedResponse.reason);
            setUserFeed([]);
          }
        }
      } catch (error) {
        console.error('프로필 데이터를 불러오는 데 실패했습니다.', error);
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

    if (targetUserName) {
      getProfileData();
    } else {
      setLoading(false);
    }

    return () => {
      isMounted = false;
    };
  }, [targetUserName]); // targetUserName을 의존성 배열에 추가

  if (loading) {
    return <LoadingComponent />;
  }

  if (!targetUserName) {
    return <div>사용자를 찾을 수 없습니다.</div>;
  }

  return (
    <Styled.ProfileBg>
      {/* 상단 프로필 정보 */}
      <ProfileInfo user_name={targetUserName} isMyProfile={true} userInfo={userInfo} />

      {/* 판매 중인 상품 */}
      {userProduct.length > 0 && <SellProduct userProduct={userProduct} />}

      {/* 피드 영역 */}
      <Styled.FeedSection>
        <h2 className="text-ir">피드 리스트입니다.</h2>
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

        {feedType === 'list' && <ListView userFeed={userFeed} />}
        {feedType === 'gallery' && <GalleryView userFeed={userFeed} />}
      </Styled.FeedSection>
    </Styled.ProfileBg>
  );
};

export default MyProfile;
