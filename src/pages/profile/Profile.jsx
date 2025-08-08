import * as Styled from './Profille.style';
import ProfileInfo from './ProfileInfo';
import SellProduct from './SellProduct';
import { LayoutGridIcon, LayoutListIcon } from '../../components/icon/Icon.style';
import ListView from './FeedList/ListView';
import GalleryView from './FeedList/GalleryView';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
//import { fetchUser } from '../../api/userApi';
import { getProductUser } from '../../api/productApi';

const Profile = () => {
  const { user_name } = useParams();
  const [userProduct, setUserProduct] = useState('');
  useEffect(() => {
    const getPost = async () => {
      try {
        const response2 = await getProductUser(user_name);
        setUserProduct(response2.data.results);
      } catch (error) {
        console.error('프로필페이지 정보를 불러오지 못했습니다.', error);
      }
    };
    getPost();
  }, [user_name]);

  return (
    <Styled.ProfileBg>
      {/* 상단프로필정보 */}
      <ProfileInfo />
      {/* 판매중인 상품영역 / 제품있을시에만 노출 */}
      {userProduct ? <SellProduct userProduct={userProduct} /> : <></>}
      {/* 피드영역 */}
      <Styled.FeedSection>
        <h2 className="text-ir">피드리스트 입니다.</h2>
        <Styled.FeedTypeBtns>
          <li>
            <button>
              <LayoutListIcon size={26} className="active" />
              <span className="text-ir">리스트형</span>
            </button>
          </li>
          <li>
            <button>
              <LayoutGridIcon size={26} />
              <span className="text-ir">갤러리형</span>
            </button>
          </li>
        </Styled.FeedTypeBtns>

        {/* 피드 리스트 영역 */}
        <Styled.FeedList className="list-type">
          <li>
            <ListView />
          </li>
        </Styled.FeedList>

        <Styled.FeedList className="gallery-type">
          <Styled.FeedListItem>
            <GalleryView />
          </Styled.FeedListItem>
          <Styled.FeedListItem>
            <GalleryView />
          </Styled.FeedListItem>
          <Styled.FeedListItem>
            <GalleryView />
          </Styled.FeedListItem>
        </Styled.FeedList>
      </Styled.FeedSection>
    </Styled.ProfileBg>
  );
};

export default Profile;
