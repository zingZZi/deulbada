import * as Styled from './ProductItem.style';
const ProductItem = ({ data }) => {
  return (
    <Styled.ProductItem>
      <a href="https://www.google.com" target="_blank">
        <Styled.ImgWrap>
          <img src={data.image_urls} alt="" />
        </Styled.ImgWrap>
        <div>
          {data.is_seller_verified ? (
            <Styled.ProductBadges>
              <Styled.BadgeCertified>인증판매</Styled.BadgeCertified>
              <Styled.BadgeDirect>산지직영</Styled.BadgeDirect>
            </Styled.ProductBadges>
          ) : (
            <Styled.ProductBadges>
              <Styled.BadgeUncertified>일반판매</Styled.BadgeUncertified>
              <Styled.BadgeDefault>입점 판매자</Styled.BadgeDefault>
            </Styled.ProductBadges>
          )}

          <Styled.ProductTitle>{data.seller_username}</Styled.ProductTitle>
          <Styled.ProductDesc>{data.description}</Styled.ProductDesc>
          <Styled.ProductPrice>{data.price.toLocaleString('ko-KR')}원</Styled.ProductPrice>
        </div>
      </a>
    </Styled.ProductItem>
  );
};

export default ProductItem;
