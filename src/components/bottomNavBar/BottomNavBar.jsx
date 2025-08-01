import { HouseIcon, MessageCircleIcon, SquarePlusIcon, UserIcon } from '../icon/Icon.style';
import * as Styled from './BottomNavBar.style';

const BottomNavBar = () => {
  return (
    <Styled.BottomNav>
      <Styled.BottomUl>
        <Styled.BottomLi>
          <Styled.BottomLink to="/home">
            <HouseIcon />홈
          </Styled.BottomLink>
        </Styled.BottomLi>
        <Styled.BottomLi>
          <Styled.BottomLink to="/chat">
            <MessageCircleIcon />
            채팅
          </Styled.BottomLink>
        </Styled.BottomLi>
        <Styled.BottomLi>
          <Styled.BottomLink to="/write">
            <SquarePlusIcon />
            게시물작성
          </Styled.BottomLink>
        </Styled.BottomLi>
        <Styled.BottomLi>
          <Styled.BottomLink to="/myProfile">
            <UserIcon />
            프로필
          </Styled.BottomLink>
        </Styled.BottomLi>
      </Styled.BottomUl>
    </Styled.BottomNav>
  );
};
export default BottomNavBar;
