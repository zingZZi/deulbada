import * as Styled from './JoinMembership.style';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';


const JoinMembership = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rePassword, setRePassword] = useState('');
  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!email.includes('@')) {
  newErrors.email = '이메일 형식이 올바르지 않습니다.';
}

    if (password.length < 8) {
      newErrors.password = '비밀번호는 8자 이상이어야 합니다.';
    }

    if (password !== rePassword) {
      newErrors.rePassword = '비밀번호가 일치하지 않습니다.';
    }

    setErrors(newErrors);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    newErrors.email = '올바른 이메일 주소를 입력해주세요.';
  }

    if (Object.keys(newErrors).length === 0) {
      // 유효성 통과 → 다음 단계로 진행
      alert('회원가입 가능!');
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
        value={email}
        placeholder="이메일 주소를 입력해주세요"
        onChange={(e) => setEmail(e.target.value)}
      />
      {errors.email && <Styled.Error>{errors.email}</Styled.Error>}
    </Styled.InputGroup>
    
    <Styled.InputGroup>
      <Styled.Label htmlFor="password">비밀번호</Styled.Label>
      <Styled.InputPassword 
        id="password" 
        type="password" 
        placeholder="비밀번호를 설정해 주세요"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      {errors.password && <Styled.Error>{errors.password}</Styled.Error>}
    </Styled.InputGroup>

    <Styled.InputGroup>
      <Styled.Label htmlFor="re-password">비밀번호 확인</Styled.Label>
      <Styled.InputPassword
        id="re-password" 
        type="password" 
        placeholder="한 번 더 입력해주세요"
        value={rePassword}
        onChange={(e) => setRePassword(e.target.value)}
      />
      {errors.rePassword && <Styled.Error>{errors.rePassword}</Styled.Error>}
    </Styled.InputGroup>

    <Styled.Button type="submit">다음</Styled.Button>

    <Link to="/join-producer">
      <Styled.Signup>생산자 인증 가입하기</Styled.Signup>
    </Link>

  </Styled.Form>

  );


};

export default JoinMembership;