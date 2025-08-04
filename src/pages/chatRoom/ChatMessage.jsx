import * as Styled from './ChatMessage.style.js';

const ChatMessage = ({ data, onImageClick }) => {
  const { sender, type, content, image, profileImage, createdTime } = data;
  const isMine = sender === 'me';

   // 시간 포맷 변환
  const formattedTime = new Date(createdTime).toLocaleTimeString('ko-KR', {
    hour: '2-digit',
    minute: '2-digit'
  });

  return (
    <Styled.MessageWrapper $isMine={isMine}>
       {!isMine && profileImage && (
        <Styled.ProfileImg src={profileImage} alt="상대 프로필" />
      )}
      <Styled.MessageLine $isMine={isMine}>
        <Styled.MessageBubble $isMine={isMine}>
          {type === 'text' ? (
            <span>{content}</span>
          ) : (
            <Styled.ImageWrapper onClick={() => onImageClick(image)}>
              <Styled.StyledImage src={image} alt="chat" />
            </Styled.ImageWrapper>
          )}
        </Styled.MessageBubble>
        <Styled.TimeText $isMine={isMine}>{formattedTime}</Styled.TimeText>
      </Styled.MessageLine>
    </Styled.MessageWrapper>
  );
};

export default ChatMessage;