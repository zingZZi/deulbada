import styled from 'styled-components';
import { PrimaryCameraIcon } from '../../components/icon/Icon.style';

export const StyledGuide = styled.section``;
export const IconButton = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;

  &:hover ${PrimaryCameraIcon} {
    color: ${({ theme }) => theme.colors.subPrimary};
  }
`;
