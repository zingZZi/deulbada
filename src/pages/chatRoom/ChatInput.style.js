import styled from 'styled-components';

export const InputWrapper = styled.form`
  position: absolute;
  height: 61px;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 12px 16px;
  display: flex;
  align-items: center;
  border-top: 1px solid ${({ theme }) => theme.colors.white400};
  background-color: ${({ theme }) => theme.colors.white100};
  z-index: 0;
`;

export const Input = styled.input`
  flex: 1;
  padding: 10px 14px;
  border: none;
  border-radius: 20px;
  font-size: ${({ theme }) => theme.fontSize.base};
`;

export const Button = styled.button` 
  margin-left: 8px;
  background-color: transparent;
  color: ${({ theme }) => theme.colors.white300};
  border: none;
  padding: 0 16px;
  font-weight: ${({ theme }) => theme.fonts.weights.medium};
  cursor: pointer;

  transition: color 0.2s ease, color 0.2s ease;
  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

export const ImageButton = styled.button`
  width: 36px;
  height: 36px;
  background-color: ${({ theme }) => theme.colors.white400};
  display: flex;
  justify-content: center;
  align-items: center; 
  align-self: center;
  border-radius: 50%;
  border: none;
  font-size: 18px;
  cursor: pointer;
  padding: 0 8px;
  color: ${({ theme }) => theme.colors.primary};
  margin-right: 18px;


  transition: background-color 0.2s ease, color 0.2s ease;
  &:hover {
    background-color: ${({ theme }) => theme.colors.primary};
  }
`;
