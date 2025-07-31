import styled from 'styled-components';

export const Header = styled.header`
  padding: 0.8rem 2rem;
  /* position: fixed;
  left: 0;
  top: 0;
  width: 100%; */
  background-color: ${({ theme }) => theme.colors.white100};
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 9;
`;

export const Logo = styled.h1`
  font-size: 0;
  width: 3.2rem;
  height: 3.2rem;
  img {
    width: 100%;
  }
`;
