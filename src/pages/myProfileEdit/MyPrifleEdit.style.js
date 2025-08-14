import styled, { css } from 'styled-components';

export const Form = styled.form`
  padding: 3rem 3.4rem 0;
  color: ${({ theme }) => theme.colors.white700};
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
  margin-bottom: 1.6rem;
  &:last-child {
    margin-bottom: 0;
  }
`;

export const Label = styled.label`
  display: inline-block;
  margin-bottom: 0.6rem;
  font-size: ${({ theme }) => theme.fontSize.small};
  color: ${({ theme }) => theme.colors.white700};
`;
const inputStyle = css`
  border: none;
  border-bottom: 1px solid #ccc;
  background: transparent;
  font-size: ${({ theme }) => theme.fontSize.base};
  line-height: 1.8rem;
  padding-bottom: 0.9rem;
  color: ${({ theme }) => theme.colors.black};
  &:focus {
    outline-style: none;
    border-bottom-color: ${({ theme }) => theme.colors.primary};
  }
  &::placeholder {
    color: ${({ theme }) => theme.colors.white300};
  }
`;
export const Id = styled.input`
  ${inputStyle}
`;

export const InputInfo = styled.input`
  ${inputStyle}
`;

export const Button = styled.button`
  padding: 1.1rem 0;
  background-color: ${({ disabled }) => (disabled ? '#A2D098' : '#5CA14E')};
  color: white;
  border: none;
  border-radius: 44px;
  margin-bottom: 1rem;
`;

export const ErrorMessage = styled.div`
  color: #e74c3c;
  font-size: 12px;
  margin-top: 4px;
`;

export const SuccessMessage = styled.div`
  color: #27ae60;
  font-size: 12px;
  margin-top: 4px;
`;

export const CheckingMessage = styled.div`
  color: #3498db;
  font-size: 12px;
  margin-top: 4px;
`;
