import * as Styled from './LoginEmail.style';
import { useState } from 'react';
import { Link } from 'react-router-dom';


const LoginEmail = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});

    const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        newErrors.email = '올바른 이메일 주소를 입력해주세요.';
      }

    if (password.length < 8) {
      newErrors.password = '비밀번호는 최소 8자 이상이어야 합니다.';
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      console.log('로그인 시도:', { email, password });
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
        onChange={(e) => setPassword(e.target.value)}
        />
      {errors.password && <Styled.Error>{errors.password}</Styled.Error>}
    </Styled.InputGroup>

    <Styled.Button type="submit">로그인</Styled.Button>

    <Link to="/join-membership">
      <Styled.Signup>이메일로 회원가입</Styled.Signup>
    </Link>

  </Styled.Form>

  );


};

export default LoginEmail;