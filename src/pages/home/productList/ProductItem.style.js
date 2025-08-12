import styled, { css } from 'styled-components';

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
    max-width: inherit;
    object-fit: cover;
    width: 100%;
    height: 100%;
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
const bedgeCommon = css`
  border-radius: 0.9rem;
  padding: 0.35rem 0.5rem;
  font-size: ${({ theme }) => theme.fontSize.xSmall};
  font-weight: ${({ theme }) => theme.fonts.weights.bold};
  color: ${({ theme }) => theme.colors.white100};
`;
const directCommon = css`
  font-weight: ${({ theme }) => theme.fonts.weights.bold};
  font-size: ${({ theme }) => theme.fontSize.small};
`;
export const BadgeCertified = styled.li`
  ${bedgeCommon}
  background-color: ${({ theme }) => theme.colors.primary};
`;
export const BadgeUncertified = styled.li`
  ${bedgeCommon}
  background-color: ${({ theme }) => theme.colors.white600};
`;
export const BadgeDirect = styled.li`
  ${directCommon}
  color: ${({ theme }) => theme.colors.primary};
`;
export const BadgeDefault = styled.li`
  ${directCommon}
  color: ${({ theme }) => theme.colors.white600};
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
  font-weight: ${({ theme }) => theme.fonts.weights.regular};
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  line-height: 1.5rem;
`;
export const ProductPrice = styled.strong`
  font-weight: ${({ theme }) => theme.fonts.weights.bold};
  font-size: ${({ theme }) => theme.fontSize.large};
`;
