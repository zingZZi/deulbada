import styled from 'styled-components';

export const ProductList = styled.ul`
  padding: 0 0.7rem;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  align-items: flex-start;
`;
export const ProductItem = styled.li`
  width: 47%;
`;
export const ImgWrap = styled.figure`
  position: relative;
  border-radius: 1rem;
  overflow: hidden;
  width: 100%;
  padding-top: 100%;
  img {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`;
export const ProductBadges = styled.ul`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 0;
  border-bottom: 1px solid ${({ theme }) => theme.colors.white300};
  margin-bottom: 0.8rem;
`;
export const BadgeCertified = styled.li`
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.white100};
  border-radius: 0.9rem;
  font-size: ${({ theme }) => theme.fontSize.xSmall};
  padding: 0.35rem 0.5rem;
  font-weight: ${({ theme }) => theme.fonts.weights.bold};
`;
export const BadgeDirect = styled.li`
  font-weight: ${({ theme }) => theme.fonts.weights.bold};
  font-size: ${({ theme }) => theme.fontSize.small};
  color: ${({ theme }) => theme.colors.primary};
`;

export const ProductTitle = styled.p`
  font-size: ${({ theme }) => theme.fontSize.small};
  font-weight: ${({ theme }) => theme.fonts.weights.bold};
  color: ${({ theme }) => theme.colors.primary};
  line-height: 1.3em;
`;
export const ProductDesc = styled.p`
  margin: 0.4rem 0;
  font-size: ${({ theme }) => theme.fontSize.small};
  color: ${({ theme }) => theme.colors.white700};
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  line-height: 1.5rem;
`;
export const ProductPrice = styled.strong`
  font-weight: ${({ theme }) => theme.fonts.weights.bold};
  font-size: ${({ theme }) => theme.fontSize.large};
`;
