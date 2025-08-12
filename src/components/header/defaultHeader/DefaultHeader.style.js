import styled from 'styled-components';
import { BasicBtn } from '../../../styles/Button.style';

export const HeaderNav = styled.div`
  display: flex;
  align-items: center;
`;
export const HeaderTitle = styled.h2`
  font-size: 1.4rem;
  font-weight: 400;
  color: #333;
  margin-left: 0.8rem;
`;
export const TextBtn = styled(BasicBtn)`
  background-color: ${({ theme }) => theme.colors.Primary};
  max-width: 9rem;
  padding: 0.7rem 2.6rem;
  font-size: ${({ theme }) => theme.fontSize.base};
  font-weight: ${({ theme }) => theme.fonts.weights.medium};
  white-space: nowrap;
  text-align: center;
`;
