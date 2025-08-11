import * as Styled from './LoginEmail.style';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../../api/auth';

const LoginEmail = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};

    // 유효성 검사
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      newErrors.email = '올바른 이메일 주소를 입력해주세요.';
    }
    if (password.length < 8) {
      newErrors.password = '비밀번호는 최소 8자 이상이어야 합니다.';
    }
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    try {
      const { accessToken, refreshToken } = await login(email, password);
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);
      navigate('/dashboard');
    } catch (err) {
      console.error(err);
      setErrors({ general: '로그인에 실패했습니다.' });
    }
  };

  return (
    <Styled.Form onSubmit={handleSubmit}>
      <Styled.H2>로그인</Styled.H2>

      <Styled.InputGroup>
        <Styled.Label htmlFor="email">이메일</Styled.Label>
        <Styled.InputEmail
          id="email"
          type="text"
          placeholder="이메일을 입력하세요"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {errors.email && <Styled.Error>{errors.email}</Styled.Error>}
      </Styled.InputGroup>

      <Styled.InputGroup>
        <Styled.Label htmlFor="password">비밀번호</Styled.Label>
        <Styled.InputPassword
          id="password"
          type="password"
          placeholder="비밀번호를 입력하세요"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {errors.password && <Styled.Error>{errors.password}</Styled.Error>}
      </Styled.InputGroup>

      {errors.general && <Styled.Error>{errors.general}</Styled.Error>}

      <Styled.Button type="submit">로그인</Styled.Button>

      <Link to="/join-membership">
        <Styled.Signup>이메일로 회원가입</Styled.Signup>
      </Link>
    </Styled.Form>
  );
};

export default LoginEmail;