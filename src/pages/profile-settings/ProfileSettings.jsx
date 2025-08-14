import * as Styled from './ProfileSettings.style';
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Camera } from 'lucide-react';
import ImagePreview from '../../assets/images/image-preview.png';
import { getAccessToken, clearTokens } from '../../auth/tokenStore';

const ProfileSettings = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // 회원가입 페이지에서 전달받은 데이터
  const signupData = location.state || {};
  const [image, setImage] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [name, setName] = useState(signupData.nickname || '');
  const [userId, setUserId] = useState(signupData.account_id || '');
  const [info, setInfo] = useState('');
  const [nameError, setNameError] = useState('');
  const [userIdError, setUserIdError] = useState('');
  const [infoError, setInfoError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  // 회원가입에서 온 데이터가 있으면 필드를 비활성화
  const isFromSignup = Boolean(
    (signupData.account_id && signupData.nickname) || // 일반 회원가입
    signupData.isFromProducerSignup // 생산자 회원가입
  );
  
  // 토큰 유효성 검증 함수
  const validateToken = () => {
    const token = getAccessToken();
    
    if (!token) {
      console.error('❌ 토큰이 없습니다.');
      alert('로그인이 필요합니다.');
      navigate('/login');
      return null;
    }
    
    try {
      // JWT 토큰인 경우 만료시간 검증
      const tokenParts = token.split('.');
      if (tokenParts.length === 3) {
        const payload = JSON.parse(atob(tokenParts[1]));
        const currentTime = Math.floor(Date.now() / 1000);
        
        if (payload.exp && payload.exp < currentTime) {
          console.error('❌ 토큰이 만료되었습니다.');
          clearTokens();
          alert('로그인이 만료되었습니다. 다시 로그인해주세요.');
          navigate('/login');
          return null;
        }
      }
    } catch (error) {
      console.warn('⚠️ 토큰 검증 중 오류:', error);
    }
    
    return token;
  };

  useEffect(() => {
    // 컴포넌트 마운트 시 토큰 검증
    const token = validateToken();
    if (!token) return;

    // 회원가입에서 온 경우 (일반 회원가입 또는 생산자 회원가입)
    if (!isFromSignup) {
      alert('잘못된 접근입니다.');
      navigate('/login');
    }
  }, [navigate, isFromSignup]);

  const isFormValid = name && userId; // info 조건 제거

  const handleSubmit = async () => {
    setIsLoading(true);
    
    // 토큰 재검증
    const token = validateToken();
    if (!token) {
      setIsLoading(false);
      return;
    }

    let isValid = true;

    // 소개글 유효성 검사를 먼저 실행
    if (!info.trim()) {
      setInfoError('소개글을 입력해주세요.');
      isValid = false;
    } else {
      setInfoError('');
    }

    // 회원가입에서 온 경우 이름과 ID 검증 스킵
    if (!isFromSignup) {
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
    }

    // 유효성 검사 실패 시 여기서 멈춤
    if (!isValid) {
      setIsLoading(false);
      return;
    }

    try {
      // FormData로 이미지만 준비
      const formData = new FormData();
      
      // 이미지 처리 - 사용자가 업로드한 이미지가 있으면 그것을, 없으면 기본 이미지 사용
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

      // API 호출
      const response = await fetch('http://43.201.70.73/api/users/mypage/profile/setup/', {
        method: 'PUT',
        body: formData,
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      console.log('API 응답 상태:', response.status);
      
      if (!response.ok) {
        let errorMessage = `HTTP ${response.status}`;
        try {
          const errorData = await response.text();
          console.error('서버 에러 응답:', errorData);
          errorMessage += `: ${errorData}`;
        } catch (e) {
          console.error('에러 응답 파싱 실패:', e);
        }
        
        switch (response.status) {
          case 401:
            alert('인증이 만료되었습니다. 다시 로그인해주세요.');
            clearTokens();
            navigate('/login');
            return;
          case 403:
            alert('접근 권한이 없습니다. 로그인 상태를 확인해주세요.');
            break;
          case 404:
            alert('요청한 리소스를 찾을 수 없습니다.');
            break;
          case 500:
            alert('서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
            break;
          default:
            alert(`프로필 설정에 실패했습니다: ${errorMessage}`);
        }
        
        throw new Error(errorMessage);
      }
      
      const result = await response.json();
      console.log('프로필 설정 성공:', result);
      
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
          <Camera color="#fff" size={22} />
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
        {nameError && <Styled.ErrorMessage>{nameError}</Styled.ErrorMessage>}
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
        {userIdError && <Styled.ErrorMessage>{userIdError}</Styled.ErrorMessage>}
      </Styled.InputGroup>

      <Styled.InputGroup>
        <Styled.Label htmlFor="info">소개</Styled.Label>
        <Styled.InputInfo
          id="info" 
          type="text" 
          placeholder="소개글을 작성해주세요!" 
          value={info}
          onChange={(e) => setInfo(e.target.value)}
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