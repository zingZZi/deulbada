import { Link } from 'react-router-dom';
import sampleImage from './../../assets/images/sample.png';
import * as Styled from './ProductList.style';

const ProductList = () => {
  return (
    <Styled.ProductListWrap>
      <Styled.ProductList>
        <Link to="">
          <Styled.ImgWrap>
            <img src={sampleImage} alt="" />
          </Styled.ImgWrap>
          <div>
            <Styled.ProductBadges>
              <Styled.BadgeCertified>인증판매</Styled.BadgeCertified>
              <Styled.BadgeDirect>산지직영</Styled.BadgeDirect>
            </Styled.ProductBadges>
            <Styled.ProductTitle>천하제일 귤농장</Styled.ProductTitle>
            <Styled.Productbio>제주 감귤 고당도 진짜 진짜 짱 맛있어요</Styled.Productbio>
            <Styled.ProductPrice>36,900원</Styled.ProductPrice>
          </div>
        </Link>
      </Styled.ProductList>
    </Styled.ProductListWrap>
  );
};

export default ProductList;
