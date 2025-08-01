import * as Styled from './Profille.style';
import ProfileInfo from './ProfileInfo';
import SellProduct from './SellProduct';
import { LayoutGridIcon, LayoutListIcon } from '../../components/icon/Icon.style';
import ListView from './FeedList/ListView';
import GalleryView from './FeedList/GalleryView';
import { useEffect, useState } from 'react';
import { fetchPosts } from '../../api/postApi';

const Profile = () => {
  const [postList, setPostList] = useState('');
  useEffect(() => {
    const getPost = async () => {
      try {
        const response = await fetchPosts();
        setPostList(response.data);
      } catch (error) {
        console.error('Post를 불러오지 못했습니다.', error);
      }
    };
    getPost();
  }, []);
  console.log(postList);
  return (
    <Styled.ProfileBg>
      {/* 상단프로필정보 */}
      <ProfileInfo />
      {/* 판매중인 상품영역 / 제품있을시에만 노출 */}
      <SellProduct />
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
