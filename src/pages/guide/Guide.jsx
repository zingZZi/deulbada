import { BasicBtn, LineBtn } from '../../styles/Button.style';
import { StyledGuide } from './Guide.style';

const Guide = () => {
  const sample = 'sample';
  return (
    <StyledGuide>
      <h1>디자인 가이드</h1>

      <BasicBtn size={'full-size'}>버튼샘플</BasicBtn>
      <BasicBtn padding={'small'}>버튼샘플</BasicBtn>
      <LineBtn padding={'medium'}>버튼샘플</LineBtn>
    </StyledGuide>
  );
};

export default Guide;
