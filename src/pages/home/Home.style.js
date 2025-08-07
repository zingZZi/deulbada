import styled from 'styled-components';

export const StyledHome = styled.section`
  padding-bottom: 8rem;
`;
export const StyledContent = styled.section`
  padding: 1.7rem 1.6rem;
`;

export const ProductListWrap = styled.section`
  padding-top: 1.3rem;
`;
export const ProductListTitle = styled.h4`
  font-size: 2rem;
  margin-bottom: 2rem;
  padding-left: 0.7rem;
  font-weight: ${({ theme }) => theme.fonts.weights.bold};
  b {
    color: ${({ theme }) => theme.colors.primary};
  }
`;
