import * as Styled from './Profille.style';
import ProfileInfo from './ProfileInfo';
import SellProduct from './SellProduct';
import { LayoutGridIcon, LayoutListIcon } from '../../components/icon/Icon.style';
import ListView from './FeedList/ListView';
import GalleryView from './FeedList/GalleryView';
import { useEffect, useState } from 'react';
import { getProductUser } from '../../api/productApi';
import LoadingComponent from '../../components/loding/Loding';
import { getUserPost } from '../../api/postApi';
import { fetchUser } from '../../api/userApi';
import { useScrollObserver } from '../../hooks/useScrollObserver';

const MyProfile = () => {
  const [userInfo, setUserInfo] = useState([]);
  const [userProduct, setUserProduct] = useState([]);
  const [userFeed, setUserFeed] = useState([]);
  const [feedType, setFeedType] = useState('list');

  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [morepage, setMorepage] = useState(true);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const isBottom = useScrollObserver();

  // localStorage에서 사용자 정보 가져오기
  const accountId = localStorage.getItem('account_id');

  function feedTypeHandler(e) {
    setFeedType(e.currentTarget.dataset.type);
  }

  // 무한 스크롤 처리
  useEffect(() => {
    if (isBottom && !isLoading && morepage && !isInitialLoad && userFeed.length > 0) {
      const timer = setTimeout(() => {
        if (!isLoading && morepage) {
          setPage((prevPage) => prevPage + 1);
        }
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [isBottom, isLoading, morepage, isInitialLoad, userFeed.length]);

  // 사용자 정보와 상품 정보 로드
  useEffect(() => {
    if (!accountId) {
      setIsLoading(false);
      return;
    }

    let isMounted = true;
    const getProfileData = async () => {
      try {
        setIsLoading(true);
        const [userResponse, productsResponse] = await Promise.allSettled([
          fetchUser(accountId),
          getProductUser(accountId),
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
            setUserProduct([]);
          }
        }
      } catch (error) {
        console.error('프로필정보를 불러오지 못했습니다.', error);
        if (isMounted) {
          setUserInfo([]);
          setUserProduct([]);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    getProfileData();

    return () => {
      isMounted = false;
    };
  }, [accountId]);

  // 피드 데이터 로드
  useEffect(() => {
    if (!accountId) return;

    const getFeed = async () => {
      setIsLoading(true);
      try {
        const response = await getUserPost(accountId, page, 6);
        const data = response.data.results || response.data;
        const nextPage = response.data.next;

        if (nextPage === null) {
          setMorepage(false);
        }

        if (page === 1) {
          setUserFeed(data || []);
          setIsInitialLoad(false);
        } else {
          setUserFeed((prevFeed) => [...prevFeed, ...(data || [])]);
        }
      } catch (error) {
        console.error('피드를 불러오지 못했습니다.', error);
        if (page === 1) {
          setUserFeed([]);
          setIsInitialLoad(false);
        }
      } finally {
        setIsLoading(false);
      }
    };

    getFeed();
  }, [accountId, page]);

  // accountId가 없을 때
  if (!accountId) {
    return (
      <Styled.ProfileBg>
        <div style={{ padding: '20px', textAlign: 'center' }}>
          <h2>로그인이 필요합니다</h2>
        </div>
      </Styled.ProfileBg>
    );
  }

  // 초기 로딩일 때
  if (isInitialLoad && isLoading) {
    return <LoadingComponent />;
  }

  return (
    <Styled.ProfileBg>
      {/* 상단프로필정보 */}
      <ProfileInfo accountId={accountId} isMyProfile={true} userInfo={userInfo} />

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

        {/* 피드가 있을 때만 리스트 표시 */}
        {userFeed.length > 0 && (
          <>
            {feedType === 'list' && <ListView userFeed={userFeed} />}
            {feedType === 'gallery' && <GalleryView userFeed={userFeed} />}
          </>
        )}

        {/* 피드가 없고 로딩이 끝났을 때 메시지 표시 */}
        {userFeed.length === 0 && !isLoading && !isInitialLoad && (
          <div style={{ padding: '40px', textAlign: 'center' }}>
            <h3>아직 작성한 게시글이 없습니다.</h3>
          </div>
        )}

        {/* 추가 데이터 로딩 중일 때 (무한스크롤) */}
        {isLoading && !isInitialLoad && (
          <div
            style={{
              minHeight: '100px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <LoadingComponent />
          </div>
        )}
      </Styled.FeedSection>
    </Styled.ProfileBg>
  );
};

export default MyProfile;
