import styled from 'styled-components';

export const StyledContainer = styled.div`
  width: 100%;
  max-width: 640px;
  padding: 0 ${({ theme }) => theme.colors.primary};
  margin: 0 auto;
`;
