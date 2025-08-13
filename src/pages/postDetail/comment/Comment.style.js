import styled from 'styled-components';
import { boxImgWrap } from '../../../styles/Common.style';

export const commentWrap = styled.ul`
  border-top: 1px solid gray;
  padding: 2rem 1.6rem;
`;
export const commentItem = styled.li`
  position: relative;
`;
export const commentUserInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 1.2rem;
`;
export const ProfileImgBox = styled.figure`
  width: 10%;
  padding-top: 10%;
  border-radius: 50%;
  overflow: hidden;
  ${boxImgWrap}
`;
export const commentContent = styled.p`
  padding-left: calc(10% + 1.2rem);
`;
