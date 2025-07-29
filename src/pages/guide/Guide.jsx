import { PrimaryCameraIcon } from '../../components/icon/Icon.style';
import { Test } from '../../components/icon/Icons';
import { BasicBtn, LineBtn } from '../../styles/Button.style';
import { IconButton, StyledGuide } from './Guide.style';
import { Camera } from 'lucide-react';

const Guide = () => {
  return (
    <StyledGuide>
      <h1>디자인 가이드</h1>
      <IconButton>
        <PrimaryCameraIcon size={60} />
      </IconButton>
      <Camera color="red" size={48} />
      <Test />
      <BasicBtn size={'full-size'}>버튼샘플</BasicBtn>
      <BasicBtn padding={'small'}>버튼샘플</BasicBtn>
      <LineBtn padding={'medium'}>버튼샘플</LineBtn>
    </StyledGuide>
  );
};

export default Guide;
