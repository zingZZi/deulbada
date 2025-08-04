import * as Styled from './SellProduct.style';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import sampleImage from './../../assets/images/sample.png'; //추후 개발붙으면 지워야함
const SellProduct = () => {
  return (
    <Styled.SellProduct>
      <Styled.SellProductTitle>판매중인 상품</Styled.SellProductTitle>

      <Swiper slidesPerView={'auto'} spaceBetween={0}>
        <Styled.AutoWidthSlide>
          <Styled.BoxImgWrap>
            <img src={sampleImage} alt="샘플이미지" />
          </Styled.BoxImgWrap>
          <Styled.ProductName>애월읍 노지 감귤</Styled.ProductName>
          <Styled.ProductPrice>35,000원</Styled.ProductPrice>
        </Styled.AutoWidthSlide>
        <Styled.AutoWidthSlide>
          <Styled.BoxImgWrap>
            <img src={sampleImage} alt="샘플이미지" />
          </Styled.BoxImgWrap>
          <Styled.ProductName>애월읍 노지 감귤</Styled.ProductName>
          <Styled.ProductPrice>35,000원</Styled.ProductPrice>
        </Styled.AutoWidthSlide>
        <Styled.AutoWidthSlide>
          <Styled.BoxImgWrap>
            <img src={sampleImage} alt="샘플이미지" />
          </Styled.BoxImgWrap>
          <Styled.ProductName>애월읍 노지 감귤</Styled.ProductName>
          <Styled.ProductPrice>35,000원</Styled.ProductPrice>
        </Styled.AutoWidthSlide>
        <Styled.AutoWidthSlide>
          <Styled.BoxImgWrap>
            <img src={sampleImage} alt="샘플이미지" />
          </Styled.BoxImgWrap>
          <Styled.ProductName>애월읍 노지 감귤</Styled.ProductName>
          <Styled.ProductPrice>35,000원</Styled.ProductPrice>
        </Styled.AutoWidthSlide>
      </Swiper>
    </Styled.SellProduct>
  );
};

export default SellProduct;
