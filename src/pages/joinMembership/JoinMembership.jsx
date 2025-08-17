import * as Styled from './JoinMembership.style';
import React, { useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { registerUser, isEmailAvailable, isAccountIdAvailable } from '../../api/authApi';
import { login } from '../../auth/authService';
import { setAccountId } from '../../auth/tokenStore';

const JoinMembership = () => {
  const [formData, setFormData] = useState({
    account_id: '',
    username: '',
    email: '',
    password: '',
    rePassword: '',
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [emailStatus, setEmailStatus] = useState(null);
  const [accountIdStatus, setAccountIdStatus] = useState(null);
  const [usernameStatus, setUsernameStatus] = useState(null);

  const navigate = useNavigate();

  const validatePassword = (password) => {
    if (!password) return '비밀번호를 입력해주세요.';
    
    const hasLetter = /[a-zA-Z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    const isLengthValid = password.length >= 8;

    if (!isLengthValid || !hasLetter || !hasNumber || !hasSpecial) {
      return '영문자, 숫자, 특수문자를 포함해 8자 이상 입력해주세요.';
    }
    return null;
  };

  const validatePasswordConfirmation = (password, rePassword) => {
    if (!rePassword) return '비밀번호 확인을 입력해주세요.';
    if (password !== rePassword) {
      return '비밀번호가 일치하지 않습니다.';
    }
    return null;
  };

  const isFormValid = useMemo(() => {
    const isAllFieldsFilled = 
      formData.email.trim() &&
      formData.password.trim() &&
      formData.rePassword.trim() &&
      formData.account_id.trim() &&
      formData.username.trim();

    if (!isAllFieldsFilled) return false;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isEmailValid = emailRegex.test(formData.email);
    const isAccountIdValid = formData.account_id.length >= 2;
    const isUsernameValid = formData.username.length >= 2;

    const isDuplicateCheckPassed = 
      emailStatus === 'available' &&
      accountIdStatus === 'available' &&
      usernameStatus === 'available';

    const isNotChecking = 
      emailStatus !== 'checking' &&
      accountIdStatus !== 'checking' &&
      usernameStatus !== 'checking';

    return (
      isEmailValid &&
      isAccountIdValid &&
      isUsernameValid &&
      isDuplicateCheckPassed &&
      isNotChecking
    );
  }, [formData, emailStatus, accountIdStatus, usernameStatus]);

  const checkUsername = async (username) => {
    if (!username || username.length < 2) return;

    setUsernameStatus('checking');

    try {
      const available = await isAccountIdAvailable(username);
      setUsernameStatus(available ? 'available' : 'taken');

      if (!available) {
        setErrors(prev => ({ ...prev, username: '이미 사용중인 닉네임입니다.' }));
      }
    } catch (error) {
      console.error('닉네임 확인 실패:', error);
      setUsernameStatus(null);
    }
  };

  const checkAccountId = async (accountId) => {
    if (!accountId || accountId.length < 2) return;

    setAccountIdStatus('checking');

    try {
      const available = await isAccountIdAvailable(accountId);
      setAccountIdStatus(available ? 'available' : 'taken');

      if (!available) {
        setErrors(prev => ({ ...prev, account_id: '이미 사용중인 계정ID입니다.' }));
      }
    } catch (error) {
      console.error('계정ID 확인 실패:', error);
      setAccountIdStatus(null);
    }
  };

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

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));

    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handlePasswordChange = (value) => {
    setFormData(prev => ({ ...prev, password: value }));
    
    setErrors(prev => {
      const newErrors = { ...prev };
      delete newErrors.password;
      delete newErrors.rePassword;
      return newErrors;
    });
  };

  const handlePasswordConfirmChange = (value) => {
    setFormData(prev => ({ ...prev, rePassword: value }));
    
    setErrors(prev => {
      const newErrors = { ...prev };
      delete newErrors.rePassword;
      return newErrors;
    });
  };

  const handleAccountIdChange = (value) => {
    const filteredValue = value.replace(/[^a-zA-Z0-9._-]/g, '');

    setFormData(prev => ({ ...prev, account_id: filteredValue }));

    if (errors.account_id) {
      setErrors(prev => ({ ...prev, account_id: '' }));
    }

    if (accountIdStatus === 'available') {
      setAccountIdStatus(null);
    }

    clearTimeout(window.accountIdCheckTimer);
    if (filteredValue.length >= 2) {
      window.accountIdCheckTimer = setTimeout(() => {
        checkAccountId(filteredValue);
      }, 500);
    }
  };

  const handleUsernameChange = (value) => {
    const filteredValue = value.replace(/[^가-힣ㄱ-ㅎㅏ-ㅣ0-9]/g, '');

    setFormData(prev => ({ ...prev, username: filteredValue }));

    if (errors.username) {
      setErrors(prev => ({ ...prev, username: '' }));
    }

    if (usernameStatus === 'available') {
      setUsernameStatus(null);
    }

    clearTimeout(window.usernameCheckTimer);
    if (filteredValue.length >= 2) {
      window.usernameCheckTimer = setTimeout(() => {
        checkUsername(filteredValue);
      }, 500);
    }
  };

  const handleEmailChange = (value) => {
    const filteredValue = value.replace(/[^a-zA-Z0-9@._+-]/g, '');

    handleInputChange('email', filteredValue);

    if (emailStatus === 'available') {
      setEmailStatus(null);
    }

    clearTimeout(window.emailCheckTimer);
    window.emailCheckTimer = setTimeout(() => {
      checkEmail(filteredValue);
    }, 500);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (isLoading) return;
    
    const newErrors = {};

    if (!formData.account_id.trim()) {
      newErrors.account_id = '계정ID를 입력해주세요.';
    } else if (formData.account_id.length < 2) {
      newErrors.account_id = '계정ID는 2자 이상이어야 합니다.';
    } else if (accountIdStatus === 'taken') {
      newErrors.account_id = '이미 사용중인 계정ID입니다.';
    }

    if (!formData.username.trim()) {
      newErrors.username = '닉네임을 입력해주세요.';
    } else if (formData.username.length < 2) {
      newErrors.username = '닉네임은 2자 이상이어야 합니다.';
    } else if (usernameStatus === 'taken') {
      newErrors.username = '이미 사용중인 닉네임입니다.';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      newErrors.email = '올바른 이메일 주소를 입력해주세요.';
    } else if (emailStatus === 'taken') {
      newErrors.email = '이미 사용중인 이메일입니다.';
    }

    const passwordError = validatePassword(formData.password);
    if (passwordError) {
      newErrors.password = passwordError;
    }

    const passwordConfirmError = validatePasswordConfirmation(formData.password, formData.rePassword);
    if (passwordConfirmError) {
      newErrors.rePassword = passwordConfirmError;
    }

    if (
      emailStatus === 'checking' ||
      accountIdStatus === 'checking' ||
      usernameStatus === 'checking'
    ) {
      newErrors.general = '중복 확인을 완료해주세요.';
    }

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) {
      return;
    }

    setIsLoading(true);

    try {
      await registerUser({
        account_id: formData.account_id,
        username: formData.username,
        email: formData.email,
        password: formData.password,
      });

      setAccountId(formData.account_id);

      await login(formData.email, formData.password);

      alert('회원가입이 완료되었습니다!');
      navigate('/profileSettings', {
        state: {
          account_id: formData.account_id,
          username: formData.username,
          email: formData.email,
        },
      });
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
          onChange={(e) => handlePasswordChange(e.target.value)}
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
          onChange={(e) => handlePasswordConfirmChange(e.target.value)}
        />
        {errors.rePassword && <Styled.Error>{errors.rePassword}</Styled.Error>}
      </Styled.InputGroup>

      <Styled.InputGroup>
        <Styled.Label htmlFor="account_id">계정ID</Styled.Label>
        <Styled.InputEmail
          id="account_id"
          type="text"
          value={formData.account_id}
          placeholder="영문, 숫자, 특수문자(.),(_)만 사용 가능합니다"
          onChange={(e) => handleAccountIdChange(e.target.value)}
        />
        {accountIdStatus === 'available' && (
          <div style={{ fontSize: '12px', marginTop: '4px', color: 'green' }}>
            ✓ 사용 가능한 계정ID입니다
          </div>
        )}
        {errors.account_id && <Styled.Error>{errors.account_id}</Styled.Error>}
      </Styled.InputGroup>

      <Styled.InputGroup>
        <Styled.Label htmlFor="username">사용자 이름</Styled.Label>
        <Styled.InputEmail
          id="username"
          type="text"
          value={formData.username}
          placeholder="나는야 야채왕 (한글과 숫자만 입력 가능합니다)"
          onChange={(e) => handleUsernameChange(e.target.value)}
        />
        {usernameStatus === 'available' && (
          <div style={{ fontSize: '12px', marginTop: '4px', color: 'green' }}>
            ✓ 사용 가능한 사용자 이름입니다
          </div>
        )}
        {errors.username && <Styled.Error>{errors.username}</Styled.Error>}
      </Styled.InputGroup>

      {errors.general && <Styled.Error>{errors.general}</Styled.Error>}

      <Styled.Button 
        type="submit" 
        disabled={isLoading || !isFormValid}
        $isActive={isFormValid}
      >
        {isLoading ? '가입 중...' : '다음'}
      </Styled.Button>

      <Link to="/joinProducer">
        <Styled.Signup>생산자 인증 가입하기</Styled.Signup>
      </Link>
    </Styled.Form>
  );
};

export default JoinMembership;