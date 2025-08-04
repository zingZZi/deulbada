import * as Styled from './LoginEmail.style';
import { Link } from 'react-router-dom';

const LoginEmail = () => {
  return (
  <Styled.Form>

    <Styled.H2>로그인</Styled.H2>

    <Styled.InputGroup>
      <Styled.Label htmlFor="email">이메일</Styled.Label>
      <Styled.InputEmail id="email" type="email" placeholder="이메일을 입력하세요" />
    </Styled.InputGroup>
    
    <Styled.InputGroup>
      <Styled.Label htmlFor="password">비밀번호</Styled.Label>
      <Styled.InputPassword id="password" type="password" placeholder="비밀번호를 입력하세요" />
    </Styled.InputGroup>

    <Styled.Button type="submit">로그인</Styled.Button>

    <Link to="/join-membership">
      <Styled.Signup>이메일로 회원가입</Styled.Signup>
    </Link>

  </Styled.Form>

  );


};

export default LoginEmail;