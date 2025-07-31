import styled from 'styled-components';

export const ChatList = styled.section`
  padding: 24px 16px;
  background-color: ${({ theme }) => theme.colors.white100};
`;

export const ChatItem = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  gap: 12px;
  cursor: pointer;
`;

export const ProfileWrapper = styled.div`
  position: relative;
`;

export const ProfileImg = styled.img`
  width: 42px;
  height: 42px;
  border-radius: 50%;
`;

export const OnlineDot = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 12px;
  height: 12px;
  background-color: #5CA14E;
  border-radius: 50%;
`;

export const TextBox = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

export const Name = styled.div`
  font-weight: ${({ theme }) => theme.fonts.weights.medium};
  font-size: ${({ theme }) => theme.fontSize.base};
  color: ${({ theme }) => theme.colors.black};
  margin-bottom: 4px;
`;

export const LastMessage = styled.div`
  max-width: 238px;
  font-size: ${({ theme }) => theme.fontSize.small};
  font-weight: ${({ theme }) => theme.fonts.weights.regular};
  color: ${({ theme }) => theme.colors.white700};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const Date = styled.div`
  font-size: 10px;
  color: ${({ theme }) => theme.colors.white300};
  align-self: flex-end;
`;