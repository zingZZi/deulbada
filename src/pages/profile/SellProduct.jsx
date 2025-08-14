import * as Styled from './SellProduct.style';
import { Swiper } from 'swiper/react';
import 'swiper/css';
const SellProduct = ({ userProduct }) => {
  console.log(userProduct);
  return (
    <Styled.SellProduct>
      <Styled.SellProductTitle>판매중인 상품</Styled.SellProductTitle>

      <Swiper slidesPerView={'auto'} spaceBetween={0}>
        {userProduct.map((e) => {
          return (
            <Styled.AutoWidthSlide>
              <a href={e.sales_link} target="_blank">
                <Styled.BoxImgWrap>
                  <img src={e.image_urls} alt="상품이미지" />
                </Styled.BoxImgWrap>
                <Styled.ProductName>{e.name}</Styled.ProductName>
                <Styled.ProductPrice>{e.price.toLocaleString('ko-KR')}원</Styled.ProductPrice>
              </a>
            </Styled.AutoWidthSlide>
          );
        })}
      </Swiper>
    </Styled.SellProduct>
  );
};

export default SellProduct;
