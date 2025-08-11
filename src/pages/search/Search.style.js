import styled from 'styled-components';

export const SearchList = styled.ul`
  padding: 2rem 1.6rem;
`;
export const SearchItem = styled.li`
  margin-bottom: 1.6rem;
`;
export const NoResult = styled.p`
  min-height: calc(100vh - 10.4rem);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 1.5rem;
  font-size: 2rem;
  color: ${({ theme }) => theme.colors.white500};
  svg {
    margin-top: -4vh;
  }
`;
