import * as Styled from './ProfileSettings.style';
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { CameraIcon } from '../../components/icon/Icons';
import ImagePreview from '../../assets/images/image-preview.png';
import { getAccessToken, clearTokens } from '../../auth/tokenStore';

const ProfileSettings = () => {
  const baseUrl = 'https://deulbada.duckdns.org';

  const location = useLocation();
  const navigate = useNavigate();
  
  const signupData = location.state || {};
  const [image, setImage] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [name, setName] = useState(signupData.username || '');
  const [userId, setUserId] = useState(signupData.account_id || '');
  const [info, setInfo] = useState('');
  const [infoError, setInfoError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const isFromSignup = Boolean(
    (signupData.account_id && signupData.username) || 
    signupData.isFromProducerSignup
  );
  
  const validateToken = () => {
    const token = getAccessToken();
    
    if (!token) {
      alert('로그인이 필요합니다.');
      navigate('/login');
      return null;
    }
    
    try {
      const tokenParts = token.split('.');
      if (tokenParts.length === 3) {
        const payload = JSON.parse(atob(tokenParts[1]));
        const currentTime = Math.floor(Date.now() / 1000);
        
        if (payload.exp && payload.exp < currentTime) {
          clearTokens();
          alert('로그인이 만료되었습니다. 다시 로그인해주세요.');
          navigate('/login');
          return null;
        }
      }
    } catch (error) {
      console.warn('토큰 검증 중 오류:', error);
    }
    
    return token;
  };

  useEffect(() => {
    const token = validateToken();
    if (!token) return;

    if (!isFromSignup) {
      alert('잘못된 접근입니다.');
      navigate('/login');
    }
  }, [navigate, isFromSignup]);

  const isFormValid = name && userId && info;

  const handleSubmit = async () => {
    setIsLoading(true);
    
    const token = validateToken();
    if (!token) {
      setIsLoading(false);
      return;
    }

    if (!info.trim()) {
      setInfoError('소개글을 입력해주세요.');
      setIsLoading(false);
      return;
    }

    try {
      const formData = new FormData();
      
      if (imageFile) {
        formData.append('profile_image', imageFile);
      } else {
        try {
          const response = await fetch(ImagePreview);
          const blob = await response.blob();
          const defaultImageFile = new File([blob], 'default-profile.png', { type: 'image/png' });
          formData.append('profile_image', defaultImageFile);
        } catch (error) {
          console.error('기본 이미지 로드 실패:', error);
          alert('기본 이미지 로드에 실패했습니다.');
          setIsLoading(false);
          return;
        }
      }

      const response = await fetch(`${baseUrl}/api/users/mypage/profile/setup/`, {
        method: 'PUT',
        body: formData,
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (!response.ok) {
        switch (response.status) {
          case 401:
            alert('인증이 만료되었습니다. 다시 로그인해주세요.');
            clearTokens();
            navigate('/login');
            return;
          case 403:
            alert('접근 권한이 없습니다.');
            break;
          case 404:
            alert('요청한 리소스를 찾을 수 없습니다.');
            break;
          case 500:
            alert('서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
            break;
          default:
            alert('프로필 설정에 실패했습니다.');
        }
        throw new Error(`HTTP ${response.status}`);
      }
      
      await response.json();
      alert('프로필 설정이 완료되었습니다!');
      navigate('/home');
      
    } catch (error) {
      console.error('프로필 설정 실패:', error);
      
      if (error.name === 'TypeError' && error.message.includes('fetch')) {
        alert('네트워크 연결을 확인해주세요.');
      } else {
        alert('프로필 설정에 실패했습니다. 다시 시도해주세요.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 1 * 1024 * 1024) {
        alert('이미지 크기는 1MB 이하여야 합니다.');
        return;
      }
      
      if (!file.type.startsWith('image/')) {
        alert('이미지 파일만 업로드 가능합니다.');
        return;
      }
      
      setImage(URL.createObjectURL(file));
      setImageFile(file);
    }
  };

  return (
    <Styled.Form onSubmit={(e) => {
      e.preventDefault(); 
      handleSubmit();
    }}>

      <Styled.H2>프로필설정</Styled.H2>
      <Styled.Message>들바다의 신선한 농수산 식품을 경험하세요!</Styled.Message>

      <Styled.ImageWrapper>
        <Styled.ImagePreview
          src={image || ImagePreview}
          alt="프로필 이미지"
        />
        <Styled.FileInputLabel htmlFor="profile-upload">
          <CameraIcon color="#fff" size={22} />
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
        <Styled.Id
          id="name" 
          type="text" 
          placeholder="2~10자 이내여야 합니다."
          value={name}
          onChange={(e) => setName(e.target.value)}
          disabled={isFromSignup}
        />
      </Styled.InputGroup>

      <Styled.InputGroup>
        <Styled.Label htmlFor="id">계정 ID</Styled.Label>
        <Styled.Id 
          id="id" 
          type="text" 
          placeholder="영문, 숫자, 특수문자(.),(_)만 사용 가능합니다." 
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          disabled={isFromSignup}
        />
      </Styled.InputGroup>

      <Styled.InputGroup>
        <Styled.Label htmlFor="info">소개</Styled.Label>
        <Styled.InputInfo
          id="info" 
          type="text" 
          placeholder="소개글을 작성해주세요!" 
          value={info}
          onChange={(e) => {
            setInfo(e.target.value);
            if (infoError) {
              setInfoError('');
            }
          }}
        />
        {infoError && <Styled.ErrorMessage>{infoError}</Styled.ErrorMessage>}
      </Styled.InputGroup>

      <Styled.Button type="submit" disabled={!isFormValid || isLoading}>
        {isLoading ? '설정 중...' : '들바다 시작하기'}
      </Styled.Button>

    </Styled.Form>
  );
};

export default ProfileSettings;