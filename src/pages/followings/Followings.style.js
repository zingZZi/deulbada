import styled from 'styled-components';
import { listLayout, listItem, NoResultText } from '../../styles/Common.style';

export const List = styled.ul`
  ${listLayout}
`;
export const Item = styled.li`
  ${listItem}
`;
export const NoResult = styled.p`
  ${NoResultText}
`;
