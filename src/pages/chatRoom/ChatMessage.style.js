import styled from 'styled-components';

export const MessageWrapper = styled.div`
  display: flex;
  justify-content: ${({ $isMine }) => ($isMine ? 'flex-end' : 'flex-start')};
  margin: 8px 16px;
`;

export const MessageBubble = styled.div`
  max-width: 240px;
  padding: 12px;
  border-radius: ${({ $isMine }) => ($isMine ? '12px 0px 12px 12px' : '0px 12px 12px 12px')};
  border: ${({ $isMine, theme }) => 
    $isMine ? 'none' : `1px solid ${theme.colors.white400}` };
  background-color: ${({ $isMine, theme }) =>
    $isMine ? theme.colors.primary : theme.colors.white100};
  color: ${({ $isMine, theme }) =>
    $isMine ? theme.colors.white100 : theme.colors.black};
  font-size: ${({ theme }) => theme.fontSize.base};
  font-weight: ${({ theme }) => theme.fonts.weights.regular};
  line-height: 1.4;
  word-break: break-word;

  img {
    max-width: 200px;
    border-radius: 12px;
    display: block;
  }
`;

export const MessageList = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 16px;
  padding-bottom: 80px;
`;

export const MessageLine = styled.div`
  display:flex;
   flex-direction: ${({ $isMine }) => ($isMine ? 'row-reverse' : 'row')}; // ✅ 나일 땐 시간 왼쪽
`;

export const ProfileImg = styled.img`
  width: 42px;
  height: 42px;
  border-radius: 50%;
  margin-right: 12px;
  align-self: flex-start;
`;

export const TimeText = styled.span`
  display: block;
  margin-top: 4px;
  font-size: ${({ theme }) => theme.fontSize.xSmall};
  color: ${({ theme }) => theme.colors.white700};
  text-align: ${({ $isMine }) => ($isMine ? 'right' : 'left')};
  align-self: flex-end;
  padding: 0 4px;
`;

export const ImageWrapper = styled.div`
  width: 200px;
  aspect-ratio: 4 / 3; // ✅ 원하는 비율 (1/1, 16/9 등도 가능)
  overflow: hidden;
  border-radius: 12px;
`;

export const StyledImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover; // or contain
  display: block;
`;