import styled, { css } from 'styled-components';
import badgeFarmerImg from './../../assets/images/badgeType-farmer.svg';
import badgeFisherImg from './../../assets/images/badgeType-fisher.svg';

const commontStyle = css`
  display: block;
  width: 1.4rem;
  height: 1.4rem;
  background-size: contain;
  background-repeat: no-repeat;
`;

export const BadgeFarmer = styled.i`
  ${commontStyle}
  background-image: url(${badgeFarmerImg});
`;
export const BadgeFisher = styled.i`
  ${commontStyle}
  background-image: url(${badgeFisherImg});
`;
