import styled, { css } from 'styled-components';

export const ModalPopup = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 1;
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
`;
export const Modal = styled.section`
  width: 65%;
  max-width: 50rem;
  border-radius: 1rem;
  background-color: ${({ theme }) => theme.colors.white100};
`;
export const Title = styled.h2`
  text-align: center;
  padding: 2.2rem 1rem;
  font-size: ${({ theme }) => theme.fontSize.large};
  color: ${({ theme }) => theme.colors.black};
`;
export const ModalBtns = styled.ul`
  display: flex;
  align-items: center;
  justify-content: center;
  border-top: 1px solid ${({ theme }) => theme.colors.white300};
`;

export const ModalBtnsItem = styled.li`
  flex: 1;
  &:nth-child(2) {
    button {
      border-right: none;
      color: ${({ theme }) => theme.colors.primary};
    }
  }
`;

const btn = css`
  width: 100%;
  padding: 1.4rem 0;
  font-size: ${({ theme }) => theme.fontSize.base};
`;
export const Btn = styled.button`
  ${btn}
  border-right:1px solid ${({ theme }) => theme.colors.white300};
`;
