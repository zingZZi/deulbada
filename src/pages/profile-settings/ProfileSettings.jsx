import * as Styled from './ProfileSettings.style';
import React, { useState } from 'react';
import { ImageIcon } from '../../components/icon/Icons';
import ImagePreview from '../../assets/images/image-preview.png';

const ProfileSettings = () => {
  const [image, setImage] = useState(null);
  const [name, setName] = useState('');
  const [userId, setUserId] = useState('');
  const [info, setInfo] = useState('');
  const [nameError, setNameError] = useState('');
  const [userIdError, setUserIdError] = useState('');
  
  const isFormValid = name && userId && info;

  const handleSubmit = () => {
    let isValid = true;

    // 이름 유효성 검사
    if (name.length < 2 || name.length > 10) {
      setNameError("이름은 2자 이상 10자 이하로 입력해주세요.");
      isValid = false;
    } else {
      setNameError('');
    }

    // ID 유효성 검사
    const idRegex = /^[a-zA-Z0-9._]+$/;
    if (!idRegex.test(userId)) {
      setUserIdError("ID는 영문, 숫자, 특수문자(.)와 (_)만 사용할 수 있습니다.");
      isValid = false;
    } else {
      setUserIdError('');
    }

    if (!isValid) return;

    console.log("제출 성공:", { name, userId, info });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

  return (
  <Styled.Form onSubmit={(e) => {
    e.preventDefault(); 
    handleSubmit();
  }}>

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
      {nameError && <Styled.ErrorMessage>{nameError}</Styled.ErrorMessage>}
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
      {userIdError && <Styled.ErrorMessage>{userIdError}</Styled.ErrorMessage>}
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