import styled from 'styled-components';

export const Header = styled.header`
  border-bottom: ${(props) =>
    props.$isMainHeader ? 'none' : `1px solid ${props.theme.colors.white300}`};
  padding: 0.8rem 1.6rem;
  //position: sticky;
  /* position: fixed;
  left: 0;
  top: 0;
  width: 100%; */
  background-color: ${({ theme }) => theme.colors.white100};
  display: flex;
  gap: 2rem;
  justify-content: space-between;
  align-items: center;
  min-height: 4.8rem;
  z-index: 9;
`;
