import { Link, NavLink } from 'react-router-dom';
import styled from 'styled-components';

export const BottomNav = styled.nav`
  position: fixed;
  width: 100%;
  left: 0;
  bottom: 0;
  border-top: 1px solid #dddddd;
  padding: 0 0.6rem;
  background-color: ${({ theme }) => theme.colors.white100};
`;
export const BottomUl = styled.ul`
  display: flex;
  gap: 1.4rem;
  align-items: stretch;
  justify-content: space-around;
`;
export const BottomLi = styled.li`
  width: calc((100% - 4.2rem) / 4);
`;
export const BottomLink = styled(NavLink)`
  font-size: 10px;
  font-weight: ${({ theme }) => theme.fonts.weights.regular};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
  padding: 1.2rem 0 0.6rem;
  svg {
    width: 2.4rem;
    height: 2.4rem;
  }
  &.active {
    color: ${({ theme }) => theme.colors.primary};
    svg {
      color: ${({ theme }) => theme.colors.primary};
    }
  }
`;
