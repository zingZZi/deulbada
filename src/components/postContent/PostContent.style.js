import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';

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
