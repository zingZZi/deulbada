import * as Styled from './ProfileSettings.style';
import React, { useState } from 'react';
import { ImageIcon } from '../../components/icon/Icons';
import ImagePreview from '../../assets/images/image-preview.png';

const ProfileSettings = () => {
  const [image, setImage] = useState(null);
  const [name, setName] = useState('');
  const [userId, setUserId] = useState('');
  const [info, setInfo] = useState('');
  const isFormValid = name && userId && info;

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

  return (
  <Styled.Form>

    <Styled.H2>프로필설정</Styled.H2>
    <Styled.Message>나중에 언제든지 변경할 수 있습니다</Styled.Message>

    <Styled.ImageWrapper>
      <Styled.ImagePreview
        src={image || ImagePreview}
        alt="프로필 이미지"
      />
      <Styled.FileInputLabel htmlFor="profile-upload">
        <ImageIcon color="#fff" size={22} />
      </Styled.FileInputLabel>
      <input
        id="profile-upload"
        type="file"
        accept="image/*"
        style={{ display: 'none' }}
        onChange={handleImageChange}
      />
    </Styled.ImageWrapper>

    <Styled.InputGroup>
      <Styled.Label htmlFor="name">사용자 이름</Styled.Label>
      <Styled.InputEmail 
        id="name" 
        type="text" 
        placeholder="2~10자 이내여야 합니다."
        value={name}
        onChange={(e) => setName(e.target.value)}
  />
    </Styled.InputGroup>
    
    <Styled.InputGroup>
      <Styled.Label htmlFor="id">계정 ID</Styled.Label>
      <Styled.InputPassword 
        id="id" 
        type="text" 
        placeholder="영문, 숫자, 특수문자(.),(_)만 사용 가능합니다." 
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
      />
    </Styled.InputGroup>

    <Styled.InputGroup>
      <Styled.Label htmlFor="info">소개</Styled.Label>
      <Styled.InputPassword 
      id="info" 
      type="text" 
      placeholder="자신과 판매할 상품에 대해 소개해 주세요!" 
      value={info}
      onChange={(e) => setInfo(e.target.value)}
      />
    </Styled.InputGroup>


    <Styled.Button type="submit" disabled={!isFormValid}>
      들바다 시작하기
    </Styled.Button>

  </Styled.Form>

  );
};

export default ProfileSettings;