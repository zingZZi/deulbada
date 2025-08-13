import * as Styled from './GalleryView.style';
import { Link } from 'react-router-dom';
const GalleryView = ({ userFeed }) => {
  const filteredData = userFeed.filter((post) => post.image_urls && post.image_urls.length > 0);
  return (
    <Styled.GalleryFeed>
      {filteredData.map((e) => {
        return (
          <Styled.FeedListItem key={e.id}>
            <Link to={`/post/${e.id}`}>
              <Styled.GalleryImgWrap>
                <img src={`http://43.201.70.73/${e.image_urls[0]}`} alt="샘플이미지" />
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
