import * as Styled from './ChatRoom.style.js';
import { useState, useEffect, useRef } from 'react';
import ChatMessage from './ChatMessage';
import ChatInput from './ChatInput';
import sampleImg from '../../assets/images/sample.png';

function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    weekday: 'short',
  });
}

function isDifferentDay(date1, date2) {
  return new Date(date1).toDateString() !== new Date(date2).toDateString();
}

const ChatRoom = () => {
  const [chatMessages, setChatMessages] = useState([]);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    const dummyData = [
      {
        id: 1,
        sender: 'other',
        type: 'text',
        content: '샬라카둘라 매지카둘라 비비디바비디부',
        profileImage: sampleImg,
        createdTime: '2025-07-31T15:21:00',
      },
      {
        id: 2,
        sender: 'other',
        type: 'text',
        content: '안녕하세요. 감귤 사고싶어요요요요요',
        profileImage: sampleImg,
        createdTime: '2025-07-31T15:21:00',
      },
      {
        id: 3,
        sender: 'me',
        type: 'text',
        content: '네 말씀하세요.',
        profileImage: sampleImg,
        createdTime: '2025-07-31T15:21:00',
      },
      {
        id: 4,
        sender: 'me',
        type: 'image',
        profileImage: sampleImg,
        image: sampleImg,
        createdTime: '2025-07-31T15:21:00',
      },
    ];
    setChatMessages(dummyData);
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [chatMessages]);

  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <Styled.ChatRoom>
      <Styled.MessageList>
        {chatMessages.map((msg, idx) => {
          const isFirst = idx === 0;
          const prevMsg = chatMessages[idx - 1];
          const isNewDay =
            isFirst || isDifferentDay(msg.createdTime, prevMsg.createdTime);

          return (
            <div key={msg.id}>
              {isNewDay && (
                <Styled.DateDivider>
                  {formatDate(msg.createdTime)}
                </Styled.DateDivider>
              )}
              <ChatMessage data={msg} onImageClick={setSelectedImage} />
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </Styled.MessageList>

      {selectedImage && (
        <Styled.ModalOverlay onClick={() => setSelectedImage(null)}>
          <Styled.ModalImage src={selectedImage} alt="확대 이미지" />
        </Styled.ModalOverlay>
      )}

      <ChatInput
        onSend={(msg) => {
          const newMessage = {
            id: Date.now(),
            sender: 'me',
            type: msg.type,
            content: msg.content || '',
            image: msg.image || null,
            createdTime: new Date().toISOString(),
          };
          setChatMessages((prev) => [...prev, newMessage]);
        }}
      />
    </Styled.ChatRoom>
  );
};

export default ChatRoom;
