import * as Styled from './JoinMembership.style';
import { Link } from 'react-router-dom';

const JoinMembership = () => {
  return (
  <Styled.Form>

    <Styled.H2>이메일로 회원가입</Styled.H2>

    <Styled.InputGroup>
      <Styled.Label htmlFor="email">이메일</Styled.Label>
      <Styled.InputEmail id="email" type="email" placeholder="이메일 주소를 입력해주세요" />
    </Styled.InputGroup>
    
    <Styled.InputGroup>
      <Styled.Label htmlFor="password">비밀번호</Styled.Label>
      <Styled.InputPassword id="password" type="password" placeholder="비밀번호를 설정해 주세요" />
    </Styled.InputGroup>

    <Styled.InputGroup>
      <Styled.Label htmlFor="password">비밀번호 확인</Styled.Label>
      <Styled.InputPassword id="re-password" type="password" placeholder="한 번 더 입력해주세요" />
    </Styled.InputGroup>

    <Styled.Button type="submit">다음</Styled.Button>

    <Link to="/join-producer">
      <Styled.Signup>생산자 인증 가입하기</Styled.Signup>
    </Link>

  </Styled.Form>

  );


};

export default JoinMembership;