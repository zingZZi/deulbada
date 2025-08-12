import styled from 'styled-components';
import { boxImgWrap } from '../../../styles/Common.style';
import { CopyIcon } from '../../../components/icon/Icons';
export const GalleryImgWrap = styled.figure`
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
export const GalleryFeed = styled.ul`
  padding: 1.6rem 1.6rem 8rem;
  display: flex;
  gap: 0.8rem;
  flex-wrap: wrap;
`;

export const FeedListItem = styled.li`
  position: relative;
  width: calc((100% - 1.6rem) / 3);
`;
