import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const PostContentLayout = styled.section`
  padding: 1.6rem 0 0 5.4rem;
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
export const Count = styled.span`
  font-weight: ${({ theme }) => theme.fonts.weights.regular};
  color: ${({ theme }) => theme.colors.white700};
  font-size: ${({ theme }) => theme.fontSize.small};
`;
export const PostData = styled.p`
  margin-top: 1.6rem;
  color: ${({ theme }) => theme.colors.white700};
  font-size: ${({ theme }) => theme.fontSize.xSmall};
`;
