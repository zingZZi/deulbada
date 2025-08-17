import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules'; // Import modules
import { boxImgWrap } from '../../styles/Common.style';

export const PostContentLayout = styled.section`
  margin-top: 1.2rem;
  padding-left: calc(12% + 1.2rem);
`;
export const PostActions = styled.div`
  display: flex;
  margin-top: 1.2rem;
  gap: 1.6rem;
`;

export const PostLikeButton = styled.button`
  font-size: 0;
  gap: 6px;
  display: flex;
  align-items: center;
`;
export const CommnetButton = styled(Link)`
  font-size: 0;
  gap: 6px;
  display: flex;
  align-items: center;
`;

const commonCountStyle = css`
  font-weight: ${({ theme }) => theme.fonts.weights.regular};
  color: ${({ theme }) => theme.colors.white700};
  font-size: ${({ theme }) => theme.fontSize.small};
`;

export const Count = styled.span`
  ${commonCountStyle}
`;
export const PostData = styled.p`
  margin-top: 1.6rem;
  color: ${({ theme }) => theme.colors.white700};
  font-size: ${({ theme }) => theme.fontSize.xSmall};
`;

export const CustomSwiper = styled(Swiper)`
  margin-top: 1.5rem;
  .swiper-pagination {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    bottom: 1.2rem;
    z-index: 1;
    display: flex;
    gap: 0.6rem;
  }
  .swiper-pagination-bullet {
    display: block;
    border-radius: 50%;
    width: 0.6rem;
    height: 0.6rem;
    background-color: ${({ theme }) => theme.colors.white100};
  }
  .swiper-pagination-bullet-active {
    background-color: ${({ theme }) => theme.colors.primary};
  }
`;

const imgBox = css`
  border-radius: 1rem;
  overflow: hidden;
`;
export const CustomSwiperItem = styled(SwiperSlide)`
  ${imgBox}
  ${boxImgWrap}
  height: 0%;
  padding-top: 75%;
`;
export const ImgBoxWrap = styled.figure`
  margin-top: 1.5rem;
  ${imgBox}
`;
export const SameImgBoxWrap = styled.figure`
  ${imgBox}
  ${boxImgWrap}
  padding-top:69%;
  margin-top: 1.5rem;
`;
