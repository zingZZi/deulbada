import styled from 'styled-components';
import { boxImgWrap } from '../../../styles/Common.style';
import { NolineIconBtn } from '../../../styles/Button.style';

export const commentWrap = styled.ul`
  border-top: 1px solid ${({ theme }) => theme.colors.white300};
  padding: 2rem 1.6rem;
`;
export const commentItem = styled.li`
  position: relative;
  margin-bottom: 1.6rem;
  &:last-child {
    margin-bottom: 0;
  }
`;
export const commentUserInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 1.2rem;
  position: relative;
`;
export const UserName = styled.p`
  font-size: ${({ theme }) => theme.fontSize.base};
  display: flex;
  align-items: center;
`;
export const Time = styled.span`
  color: ${({ theme }) => theme.colors.white700};
  padding-left: 0.6rem;
  font-size: ${({ theme }) => theme.fontSize.xSmall};
  font-weight: ${({ theme }) => theme.fonts.weights.regular};
`;
export const ProfileImgBox = styled.figure`
  ${boxImgWrap}
  width: 10%;
  padding-top: 10%;
  border-radius: 50%;
  overflow: hidden;
  flex-shrink: 0;
`;
export const CommentContent = styled.p`
  padding-left: calc(10% + 1.2rem);
  font-size: ${({ theme }) => theme.fontSize.base};
  color: ${({ theme }) => theme.colors.black};
  font-weight: ${({ theme }) => theme.fonts.weights.regular};
`;
export const MoreBtn = styled(NolineIconBtn)`
  position: absolute;
  right: 0;
  top: 0;
`;
