import { css } from 'styled-components';
export const boxImgWrap = css`
  position: relative;
  overflow: hidden;
  img {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`;

//검색/팔로워리스트/팔로잉리스트 공통 레이아웃
export const listLayout = css`
  padding: 2rem 1.6rem;
`;
export const listItem = css`
  margin-bottom: 1.6rem;
  position: relative;
`;

export const NoResultText = css`
  min-height: 40rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
`;
