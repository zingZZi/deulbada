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
