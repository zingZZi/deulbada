import * as Styled from './GalleryView.style';
import { useScrollObserver } from '../../../hooks/useScrollObserver';
import { Link } from 'react-router-dom';
const GalleryView = ({ userFeed }) => {
  const isBottom = useScrollObserver();
  const filteredData = userFeed.filter((post) => post.image_urls && post.image_urls.length > 0);
  console.log(isBottom);
  return (
    <Styled.GalleryFeed>
      {filteredData.map((e) => {
        return (
          <Styled.FeedListItem key={e.id}>
            <Link to={`/post/${e.id}`}>
              <Styled.GalleryImgWrap>
                <img src={e.image_urls[0]} alt="샘플이미지" />
                {e.image_urls.length > 1 && <Styled.StyledCopyIcon />}
              </Styled.GalleryImgWrap>
            </Link>
          </Styled.FeedListItem>
        );
      })}
    </Styled.GalleryFeed>
  );
};

export default GalleryView;
