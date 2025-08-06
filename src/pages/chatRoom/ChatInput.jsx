import { useState, useRef } from 'react';
import * as Styled from './ChatInput.style.js';
import { Image } from 'lucide-react';

const ChatInput = ({ onSend }) => {
  const [message, setMessage] = useState('');
  const fileInputRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    onSend({type: 'text', content: message});
    setMessage('');
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('이미지 파일만 업로드할 수 있어요!');
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      if (reader.result) {
        onSend({ type: 'image', image: reader.result });
      } else {
        alert('이미지 로드에 실패했어요!');
      }
    };
    reader.readAsDataURL(file);
  };


  return (
    <Styled.InputWrapper onSubmit={handleSubmit}>
      <Styled.ImageButton
        type="button"
        onClick={() => fileInputRef.current.click()}
      >
        <Image color="#ffffff" size={22}/>
      </Styled.ImageButton>
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        style={{ display: 'none' }}
        onChange={handleImageUpload}
      />
      <Styled.Input
        type="text"
        placeholder="메시지를 입력하세요"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <Styled.Button type="submit">전송</Styled.Button>
    </Styled.InputWrapper>
  );
};

export default ChatInput;
