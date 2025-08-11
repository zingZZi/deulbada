import styled from 'styled-components';
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

export const ProductList = styled.ul`
  padding: 0 0.7rem;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  align-items: flex-start;
  gap: 3rem 0;
`;
