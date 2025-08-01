import styled from 'styled-components';
import { boxImgWrap } from '../../../styles/Common.style';
import { CopyIcon } from '../../../components/icon/Icons';
export const GalleryImgWrap = styled.div`
  ${boxImgWrap}
  padding-top: 100%;
`;

export const StyledCopyIcon = styled(CopyIcon)`
  position: absolute;
  top: 0.6rem;
  right: 0.6rem;
  width: 1.6rem;
  height: 1.6rem;
`;
