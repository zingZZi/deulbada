import * as Styled from './JoinMembership.style';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { registerUser, isEmailAvailable, isUsernameAvailable } from '../../api/authAPI';
import { login } from '../../auth/authService';

const JoinMembership = () => {
  const [formData, setFormData] = useState({
    username: '',
    nickname: '',
    email: '',
    password: '',
    rePassword: ''
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [emailStatus, setEmailStatus] = useState(null);
  const [usernameStatus, setUsernameStatus] = useState(null);
  const [nicknameStatus, setNicknameStatus] = useState(null);
  
  const navigate = useNavigate();

  // 닉네임 중복 확인
  const checkNickname = async (nickname) => {
    if (!nickname || nickname.length < 2) return;
    
    setNicknameStatus('checking');
    
    try {
      const available = await isUsernameAvailable(nickname);
      setNicknameStatus(available ? 'available' : 'taken');
      
      if (!available) {
        setErrors(prev => ({ ...prev, nickname: '이미 사용중인 닉네임입니다.' }));
      }
    } catch (error) {
      console.error('닉네임 확인 실패:', error);
      setNicknameStatus(null);
    }
  };

  // 사용자명(계정ID) 중복 확인
  const checkUsername = async (username) => {
    if (!username || username.length < 2) return;
    
    setUsernameStatus('checking');
    
    try {
      const available = await isUsernameAvailable(username);
      setUsernameStatus(available ? 'available' : 'taken');
      
      if (!available) {
        setErrors(prev => ({ ...prev, username: '이미 사용중인 계정ID입니다.' }));
      }
    } catch (error) {
      console.error('계정ID 확인 실패:', error);
      setUsernameStatus(null);
    }
  };

  // 이메일 중복 확인
  const checkEmail = async (email) => {
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return;
    
    setEmailStatus('checking');
    
    try {
      const available = await isEmailAvailable(email);
      setEmailStatus(available ? 'available' : 'taken');
      
      if (!available) {
        setErrors(prev => ({ ...prev, email: '이미 사용중인 이메일입니다.' }));
      }
    } catch (error) {
      console.error('이메일 확인 실패:', error);
      setEmailStatus(null);
    }
  };

  // 입력값 변경 처리
  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // 해당 필드의 에러 제거
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  // 계정ID 입력 처리
  const handleUsernameChange = (value) => {
    // 영문, 숫자, 특수문자만 허용
    const filteredValue = value.replace(/[^a-zA-Z0-9._-]/g, '');
    
    setFormData(prev => ({ ...prev, username: filteredValue }));
    
    // 에러 제거
    if (errors.username) {
      setErrors(prev => ({ ...prev, username: '' }));
    }
    
    // 사용 가능 상태 초기화
    if (usernameStatus === 'available') {
      setUsernameStatus(null);
    }
    
    // 중복 확인 (500ms 지연)
    clearTimeout(window.usernameCheckTimer);
    if (filteredValue.length >= 2) {
      window.usernameCheckTimer = setTimeout(() => {
        checkUsername(filteredValue);
      }, 500);
    }
  };

  // 닉네임 입력 처리
  const handleNicknameChange = (value) => {
    // 한글과 숫자만 허용
    const filteredValue = value.replace(/[^가-힣ㄱ-ㅎㅏ-ㅣ0-9]/g, '');
    
    setFormData(prev => ({ ...prev, nickname: filteredValue }));
    
    // 에러 제거
    if (errors.nickname) {
      setErrors(prev => ({ ...prev, nickname: '' }));
    }
    
    // 사용 가능 상태 초기화
    if (nicknameStatus === 'available') {
      setNicknameStatus(null);
    }
    
    // 중복 확인 (500ms 지연)
    clearTimeout(window.nicknameCheckTimer);
    if (filteredValue.length >= 2) {
      window.nicknameCheckTimer = setTimeout(() => {
        checkNickname(filteredValue);
      }, 500);
    }
  };

  // 이메일 입력 처리
  const handleEmailChange = (value) => {
    // 이메일에 허용되는 문자만 필터링
    const filteredValue = value.replace(/[^a-zA-Z0-9@._+-]/g, '');
    
    handleInputChange('email', filteredValue);
    
    // 사용 가능 상태 초기화
    if (emailStatus === 'available') {
      setEmailStatus(null);
    }
    
    // 중복 확인 (500ms 지연)
    clearTimeout(window.emailCheckTimer);
    window.emailCheckTimer = setTimeout(() => {
      checkEmail(filteredValue);
    }, 500);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};

    // 계정ID 유효성 검사
    if (!formData.username.trim()) {
      newErrors.username = '계정ID를 입력해주세요.';
    } else if (formData.username.length < 2) {
      newErrors.username = '계정ID는 2자 이상이어야 합니다.';
    } else if (usernameStatus === 'taken') {
      newErrors.username = '이미 사용중인 계정ID입니다.';
    }

    // 닉네임 유효성 검사
    if (!formData.nickname.trim()) {
      newErrors.nickname = '닉네임을 입력해주세요.';
    } else if (formData.nickname.length < 2) {
      newErrors.nickname = '닉네임은 2자 이상이어야 합니다.';
    } else if (nicknameStatus === 'taken') {
      newErrors.nickname = '이미 사용중인 닉네임입니다.';
    }

    // 이메일 유효성 검사
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      newErrors.email = '올바른 이메일 주소를 입력해주세요.';
    } else if (emailStatus === 'taken') {
      newErrors.email = '이미 사용중인 이메일입니다.';
    }

    // 비밀번호 유효성 검사
    if (formData.password.length < 8) {
      newErrors.password = '영문자, 숫자, 특수문자를 포함해 8자 이상 입력해주세요.';
    } else {
      const hasLetter = /[a-zA-Z]/.test(formData.password);
      const hasNumber = /[0-9]/.test(formData.password);
      const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(formData.password);
      
      if (!hasLetter || !hasNumber || !hasSpecial) {
        newErrors.password = '영문자, 숫자, 특수문자를 포함해 8자 이상 입력해주세요.';
      }
    }

    // 비밀번호 확인
    if (formData.password !== formData.rePassword) {
      newErrors.rePassword = '비밀번호가 일치하지 않습니다.';
    }

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    // 중복 확인 대기 중이면 에러
    if (emailStatus === 'checking' || usernameStatus === 'checking' || nicknameStatus === 'checking') {
      setErrors({ general: '중복 확인을 완료해주세요.' });
      return;
    }

    setIsLoading(true);

    try {
      const result = await registerUser({
        username: formData.username,
        nickname: formData.nickname,
        email: formData.email,
        password: formData.password
      });
      
      console.log('회원가입 성공:', result);
      
      // 회원가입 성공 후 자동 로그인
      const loginResult = await login(formData.email, formData.password);
      console.log('자동 로그인 성공:', loginResult);
      
      alert('회원가입이 완료되었습니다!');
      navigate('/home');
      
    } catch (error) {
      console.error('회원가입 실패:', error);
      setErrors({ general: '회원가입에 실패했습니다. 다시 시도해주세요.' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Styled.Form onSubmit={handleSubmit}>
      <Styled.H2>이메일로 회원가입</Styled.H2>

      <Styled.InputGroup>
        <Styled.Label htmlFor="email">이메일</Styled.Label>
        <Styled.InputEmail
          id="email"
          type="text"
          value={formData.email}
          placeholder="이메일 주소를 입력해주세요"
          onChange={(e) => handleEmailChange(e.target.value)}
        />
        {emailStatus === 'available' && (
          <div style={{ fontSize: '12px', marginTop: '4px', color: 'green' }}>
            ✓ 사용 가능한 이메일입니다
          </div>
        )}
        {errors.email && <Styled.Error>{errors.email}</Styled.Error>}
      </Styled.InputGroup>
      
      <Styled.InputGroup>
        <Styled.Label htmlFor="password">비밀번호</Styled.Label>
        <Styled.InputPassword 
          id="password" 
          type="password" 
          placeholder="영문자, 숫자, 특수문자를 포함해 8자 이상 입력해주세요"
          value={formData.password}
          onChange={(e) => handleInputChange('password', e.target.value)}
        />
        {errors.password && <Styled.Error>{errors.password}</Styled.Error>}
      </Styled.InputGroup>

      <Styled.InputGroup>
        <Styled.Label htmlFor="re-password">비밀번호 확인</Styled.Label>
        <Styled.InputPassword
          id="re-password" 
          type="password" 
          placeholder="한 번 더 입력해주세요"
          value={formData.rePassword}
          onChange={(e) => handleInputChange('rePassword', e.target.value)}
        />
        {errors.rePassword && <Styled.Error>{errors.rePassword}</Styled.Error>}
      </Styled.InputGroup>

      <Styled.InputGroup>
        <Styled.Label htmlFor="username">계정ID</Styled.Label>
        <Styled.InputEmail
          id="username"
          type="text"
          value={formData.username}
          placeholder="영문, 숫자, 특수문자(.),(_)만 사용 가능합니다"
          onChange={(e) => handleUsernameChange(e.target.value)}
        />
        {usernameStatus === 'available' && (
          <div style={{ fontSize: '12px', marginTop: '4px', color: 'green' }}>
            ✓ 사용 가능한 계정ID입니다
          </div>
        )}
        {errors.username && <Styled.Error>{errors.username}</Styled.Error>}
      </Styled.InputGroup>

      <Styled.InputGroup>
        <Styled.Label htmlFor="nickname">사용자 이름</Styled.Label>
        <Styled.InputEmail
          id="nickname"
          type="text"
          value={formData.nickname}
          placeholder="나는야 야채왕 (한글과 숫자만 입력 가능합니다)"
          onChange={(e) => handleNicknameChange(e.target.value)}
        />
        {nicknameStatus === 'available' && (
          <div style={{ fontSize: '12px', marginTop: '4px', color: 'green' }}>
            ✓ 사용 가능한 사용자 이름입니다
          </div>
        )}
        {errors.nickname && <Styled.Error>{errors.nickname}</Styled.Error>}
      </Styled.InputGroup>

      {errors.general && <Styled.Error>{errors.general}</Styled.Error>}

      <Styled.Button type="submit" disabled={isLoading}>
        {isLoading ? '가입 중...' : '다음'}
      </Styled.Button>

      <Link to="/join-producer">
        <Styled.Signup>생산자 인증 가입하기</Styled.Signup>
      </Link>

    </Styled.Form>
  );
};

export default JoinMembership;