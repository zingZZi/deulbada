import styled from 'styled-components';

export const StyledContentList = styled.li`
  margin-bottom: 1.5rem;
  position: relative;
  &:last-child {
    margin-bottom: 0;
  }
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
