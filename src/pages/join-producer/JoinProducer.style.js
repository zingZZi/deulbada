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
  padding: 5.8rem 0 0;
  margin-bottom: 4.8rem;
  color: ${({ theme }) => theme.colors.black};
  font-weight: ${({ theme }) => theme.fonts.weights.regular};
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
  margin-bottom: 0.3rem;
  color: ${({ theme }) => theme.colors.black};

  &::placeholder {
  color: ${({ theme }) => theme.colors.white300};

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

export const InputRePassword = styled.input`
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

export const InputName = styled.input`
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
  }`;

export const InputNumber = styled.input`
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
  }`;

export const InputBusiness = styled.input`
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
  }`;

  export const InputPoscal = styled.input`
  box-sizing: border-box;
  border: none;
  border-bottom: 1px solid #ccc;
  background: transparent;
  font-size: 1.2rem;
  margin-bottom: 1rem;
  color: ${({ theme }) => theme.colors.black};

  &::placeholder {
  color: ${({ theme }) => theme.colors.white300};
}
  &:focus {
  outline: none;
  border-bottom: 1px solid #5CA14E;
  }
`;

export const Input = styled.input`
  box-sizing: border-box;
  border: none;
  border-bottom: 1px solid #ccc;
  background: transparent;
  font-size: 1.2rem;
  margin-bottom: 0rem;
  color: ${({ theme }) => theme.colors.black};

  &::placeholder {
  color: ${({ theme }) => theme.colors.white300};
}
  &:focus {
  outline: none;
  border-bottom: 1px solid #5CA14E;
  }
`;

export const InputWrapper = styled.div`
  width: 73%;
  display: flex;
  gap: 1rem;
  margin-bottom: 1.3rem;

  align-self: flex-start;
  align-items: flex-end;

  & > input {
  flex: 1;
  min-width: 0;
  }
`;

export const AddressButton = styled.button`
  padding: 0.6rem 1.2rem;
  background: #A2D098;
  color: white;
  border: none;
  font-size: 1.2rem;
  margin-bottom: 1.0rem;
`;

export const FlexRow = styled.div`
  width: 100%;
  display: flex;
  gap: 1rem;

  & > ${Input} {
    flex: 1 1 0; 
    min-width: 0; 
  }

  @media (max-width: 360px) {
    flex-direction: column;
    gap: 2.2rem;
  }
`;

export const Select = styled.select.attrs((props) => ({
  hasValue: props.value !== "",
}))`
  height: 2.8rem;
  padding: 0 2rem 0 0;
  font-size: 1.2rem;
  color: ${({ hasValue, theme }) =>
    hasValue ? theme.colors.black : theme.colors.white300};
  background: transparent;
  border: none;
  border-bottom: 1px solid #ccc;
  appearance: none;
  margin-bottom: 1.8rem;

  &:focus {
    outline: none;
    border-bottom: 1px solid #5CA14E;
  }

  option {
    color: ${({ theme }) => theme.colors.black};
  }
`;

export const FileInputWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

export const FileInput = styled.input`
  flex: 1;
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.black};
  background: transparent;
  border: none;
  border-bottom: 1px solid #ccc;
  height: 2.8rem;
  cursor: pointer;

  &::file-selector-button {
    background-color: #A2D098;
    color: white;
    border: none;
    padding: 0.4rem 1rem;
    font-size: 1rem;
    cursor: pointer;
  }
`;

export const FileButton = styled.button`
  padding: 0.6rem 1.2rem;
  background-color: #5CA14E;
  color: white;
  border: none;
  font-size: 1rem;
  cursor: pointer;
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