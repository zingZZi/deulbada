import styled from 'styled-components';

export const HeaderForm = styled.form`
  width: 100%;
`;
export const HeaderInput = styled.input`
  width: 100%;
  border: none;
  padding: 0.7rem 1.6rem;
  border-radius: 3.2rem;
  font-size: ${({ theme }) => theme.fontSize.base};
  background-color: ${({ theme }) => theme.colors.white200};
  font-weight: ${({ theme }) => theme.fonts.weights.regular};
`;
