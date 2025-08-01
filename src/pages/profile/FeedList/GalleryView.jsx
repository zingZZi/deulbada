import * as Styled from './GalleryView.style';
import sampleImage from './../../../assets/images/sample.png';
const GalleryView = () => {
  return (
    <>
      <Styled.GalleryImgWrap>
        <img src={sampleImage} alt="샘플이미지" />
        <Styled.StyledCopyIcon />
      </Styled.GalleryImgWrap>
    </>
  );
};

export default GalleryView;
