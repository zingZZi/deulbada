import styled from 'styled-components';

export const ChatRoom = styled.section`
  display: flex;
  flex-direction: column;
  height: calc(100vh - 60px);
  position: relative;
  background-color: ${({ theme }) => theme.colors.white200};
`;

export const MessageList = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 16px;
  padding-bottom: 80px;
  &::-webkit-scrollbar {
    display: none;
  }
`;

export const DateDivider = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.white700};
  font-size: 12px;
  margin: 20px ;

  &::before,
  &::after {
    content: '';
    flex: 1;
    border-top: 1px solid #ccc;
  }

  &::before {
    margin-right: 10px;
  }

  &::after {
    margin-left: 10px;
  }
`;

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  z-index: 1000;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ModalImage = styled.img`
  max-width: 80%;
  max-height: 80%;
  border-radius: 8px;
  object-fit: contain;
`;
