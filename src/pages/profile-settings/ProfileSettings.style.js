import styled from 'styled-components';

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 0 3.4rem;
  color: ${({ theme }) => theme.colors.white700};
`;

export const H2 = styled.h2`
  text-align: center;
  font-size: 2.4rem;
  padding: 5.8rem 0 0;
  margin-bottom: 1.2rem;
  color: ${({ theme }) => theme.colors.black};
  font-weight: ${({ theme }) => theme.fonts.weights.regular};
`;

export const Message = styled.h2`
  margin-bottom: 4.8rem;
  text-align: center;
`;

export const ImageWrapper = styled.div`
  position: relative;
  width: fit-content;
  height: fit-content;
  margin: 0 auto 4.8rem;
`;

export const ImagePreview = styled.img`
  width: 140px;
  height: 140px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid #ccc;
  display: block;
  margin: 0 auto;
`;

export const FileInputLabel = styled.label`
  position: absolute;
  width: 3.6rem;
  height: 3.6rem;
  bottom: 0.6rem;
  right: 0.6rem;
  background: #5ca14e;
  color: white;
  font-size: 0.9rem;
  cursor: pointer;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;
`;

export const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 0.8rem;
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
  margin-bottom: 0.3rem;
  color: ${({ theme }) => theme.colors.black};

  &::placeholder {
    color: ${({ theme }) => theme.colors.white300};
  }

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
  color: ${({ theme }) => theme.colors.white300};
}

  &:focus {
  outline: none;
  border-bottom: 1px solid #5CA14E;
  }
`;

export const Button = styled.button`
  padding: 1.1rem 0;
  background-color: ${({ disabled }) => (disabled ? '#A2D098' : '#5CA14E')};
  color: white;
  border: none;
  border-radius: 44px;
  margin-bottom: 1.0rem;
`;

export const ErrorMessage = styled.div`
  color: red;
  font-size: 12px;
  margin-top: 4px;
  font-weight: ${({ theme }) => theme.fonts.weights.regular};
`;