import styled from 'styled-components';
import { Link } from 'react-router-dom';

const StyledPostContent = styled.section`
  padding: 1.6rem 0 0 5.4rem;
`;
const StyledPostActions = styled.div`
  display: flex;
  margin-top: 1.2rem;
  gap: 1.6rem;
`;

const StyledPostLikeButton = styled.button`
  font-size: 0;
  gap: 6px;
  display: flex;
  align-items: center;
`;
const StyledCommnetButton = styled(Link)`
  font-size: 0;
  gap: 6px;
  display: flex;
  align-items: center;
`;
const StyledCount = styled.span`
  font-weight: ${({ theme }) => theme.fonts.weights.regular};
  color: ${({ theme }) => theme.colors.white700};
  font-size: ${({ theme }) => theme.fontSize.small};
`;
const StyledPostData = styled.p`
  margin-top: 1.6rem;
  color: ${({ theme }) => theme.colors.white700};
  font-size: ${({ theme }) => theme.fontSize.xSmall};
`;
export {
  StyledPostContent,
  StyledPostActions,
  StyledPostData,
  StyledPostLikeButton,
  StyledCommnetButton,
  StyledCount,
};
