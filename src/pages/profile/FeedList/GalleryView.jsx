import * as Styled from './GalleryView.style';
const GalleryView = ({ userFeed }) => {
  const filteredData = userFeed.filter((post) => post.image_urls && post.image_urls.length > 0);

  return (
    <Styled.GalleryFeed>
      {filteredData.map((e) => {
        return (
          <Styled.FeedListItem key={e.id}>
            <Styled.GalleryImgWrap>
              <img src={e.image_urls[0]} alt="샘플이미지" />
              {e.image_urls.length > 1 && <Styled.StyledCopyIcon />}
            </Styled.GalleryImgWrap>
          </Styled.FeedListItem>
        );
      })}
    </Styled.GalleryFeed>
  );
};

export default GalleryView;
