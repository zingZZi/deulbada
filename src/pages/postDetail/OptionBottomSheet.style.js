import styled from 'styled-components';

export const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.4);
  z-index: 998;
`;

export const BottomSheet = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  background: ${({ theme }) => theme.colors.white100};
  border-radius: 12px 12px 0 0;
  padding: 16px 0;
  box-shadow: 0 -2px 10px rgba(0,0,0,0.1);
  z-index: 999;
  display: flex;
  flex-direction: column;
  animation: slideUp 0.25s ease-out;

  button {
    background: none;
    border: none;
    padding: 16px;
    font-size: ${({ theme }) => theme.fontSize.large};
    text-align: left;
    cursor: pointer;
  }

  @keyframes slideUp {
    from {
      transform: translateY(100%);
    }
    to {
      transform: translateY(0);
    }
  }
`;

export const CancelButton = styled.button`
  margin-top: 8px;
  background: ${({ theme }) => theme.colors.white100} !important;
`;

export const HandleBar = styled.div`
  width: 40px;
  height: 4px;
  background: ${({ theme }) => theme.colors.white400};
  border-radius: 2px;
  margin: 0 auto 12px;
`;
