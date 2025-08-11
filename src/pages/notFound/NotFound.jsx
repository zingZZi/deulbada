import * as Styled from './NotFound.style';
import { BasicBtn } from './../../styles/Button.style';
import notfoundImg from './../../assets/images/404Img.png';
const NotFound = () => {
  return (
    <Styled.NotFound>
      <Styled.NotFoundImg src={notfoundImg} alt="404이미지" />
      <Styled.NotFoundTitle>페이지를 찾을 수 없습니다</Styled.NotFoundTitle>
      <BasicBtn padding={'13px 26px'}>이전페이지</BasicBtn>
    </Styled.NotFound>
  );
};
export default NotFound;
