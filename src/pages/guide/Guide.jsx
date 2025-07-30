import { HouseIcon } from '../../components/icon/Icon.style';
import { ArrowIcon, EllipsisVerticalIcon } from '../../components/icon/Icons';
import PostContent from '../../components/postContent/PostContent';
import UserInfo from '../../components/userInfo/UserInfo';
import { BasicBtn, LineBtn } from '../../styles/Button.style';
import { IconButton, StyledGuide } from './Guide.style';

const Guide = () => {
  return (
    <StyledGuide>
      <h1 className="text">디자인 가이드</h1>
      <HouseIcon />
      <ArrowIcon size={70} />
      <BasicBtn size={'full-size'} disabled={true}>
        버튼샘플
      </BasicBtn>
      <BasicBtn padding={'small'}>버튼샘플</BasicBtn>
      <LineBtn padding={'medium'}>버튼샘플</LineBtn>

      <LineBtn padding={'medium'}>버튼샘플</LineBtn>
      <LineBtn padding={'medium'}>버튼샘플</LineBtn>
      <LineBtn padding={'medium'}>버튼샘플</LineBtn>
      <EllipsisVerticalIcon />

      <UserInfo as="li" />
      <article>
        <UserInfo as="div" />
        <PostContent />
      </article>
    </StyledGuide>
  );
};

export default Guide;
