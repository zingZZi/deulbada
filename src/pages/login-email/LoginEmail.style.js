import styled from 'styled-components';

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 0 3.4rem;
`;

export const H2 = styled.h2`
  text-align: center;
  font-size: 2.4rem;
  font-weight: bold;
  padding: 5.8rem 0 0;
  margin-bottom: 4.8rem;
  color: ${({ theme }) => theme.colors.black};
`;

export const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 1.8rem;
`;

export const Label = styled.label`
  display: inline-block;
  margin-bottom: 1.8rem;
  color: ${({ theme }) => theme.colors.white700};
`;

export const InputEmail = styled.input`
  border: none;
  border-bottom: 1px solid #ccc;
  background: transparent;
  font-size: 1.2rem;
  margin-bottom: 1.8rem;
  color: ${({ theme }) => theme.colors.black};

  &::placeholder {
  color: ${({ theme }) => theme.colors.black};

  &:focus {
  outline: none;
  border-bottom: 1px solid #5CA14E;
  }
`;

export const InputPassword = styled.input`
  border: none;
  border-bottom: 1px solid #ccc;
  background: transparent;
  font-size: 1.2rem;
  margin-bottom: 0.3rem;
  color: ${({ theme }) => theme.colors.black};

  &::placeholder {
  color: ${({ theme }) => theme.colors.black};
}

  &:focus {
  outline: none;
  border-bottom: 1px solid #5CA14E;
  }
`;

export const Button = styled.button`
  padding: 1.1rem 0;
  background: #A2D098;
  color: white;
  border: none;
  border-radius: 44px;
  margin-bottom: 1.0rem;
`;

export const Signup = styled.span`
  display: flex;
  justify-content: center;
  font-size: 1.2rem;
  color: ${({ theme }) => theme.colors.white700};
  font-weight: ${({ theme }) => theme.fonts.weights.regular};
`;

