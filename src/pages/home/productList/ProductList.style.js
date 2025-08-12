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
export const NoList = styled.p`
  font-size: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 1.5rem;
  color: ${({ theme }) => theme.colors.white700};
  min-height: calc(60vh - 16.4rem);
`;
