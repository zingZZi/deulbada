import styled from 'styled-components';
import { SwiperSlide } from 'swiper/react';
import { boxImgWrap } from '../../styles/Common.style';
export const SellProduct = styled.section`
  padding: 2rem 0 2rem 1.6rem;
  margin: 0 0 0.6rem;
  background-color: ${({ theme }) => theme.colors.white100};
`;
export const SellProductTitle = styled.h2`
  font-weight: ${({ theme }) => theme.fonts.weights.bold};
  font-size: ${({ theme }) => theme.fontSize.large};
  margin-bottom: 1.6rem;
`;

export const AutoWidthSlide = styled(SwiperSlide)`
  display: inline-flex;
  width: auto !important;
  flex-direction: column;
  padding-right: 1rem;
`;
export const BoxImgWrap = styled.figure`
  ${boxImgWrap};
  border-radius: 0.5rem;
  width: 14rem;
  padding-top: 9rem;
`;
export const ProductName = styled.p`
  font-weight: ${({ theme }) => theme.fonts.weights.regular};
  color: ${({ theme }) => theme.colors.black};
  font-size: ${({ theme }) => theme.fontSize.base};
  width: 14rem;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  margin: 0.6rem 0 0.4rem;
`;
export const ProductPrice = styled.b`
  color: ${({ theme }) => theme.colors.primary};
  font-weight: ${({ theme }) => theme.fonts.weights.bold};
  font-size: ${({ theme }) => theme.fontSize.small};
`;
