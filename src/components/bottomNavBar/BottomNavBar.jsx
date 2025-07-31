import { HouseIcon, MessageCircleIcon, SquarePlusIcon, UserIcon } from '../icon/Icon.style';
import * as Styled from './BottomNavBar.style';

const BottomNavBar = () => {
  return (
    <Styled.BottomNav>
      <Styled.BottomUl>
        <Styled.BottomLi>
          <Styled.BottomLink to="/home" activeClassName="active">
            <HouseIcon />홈
          </Styled.BottomLink>
        </Styled.BottomLi>
        <Styled.BottomLi>
          <Styled.BottomLink to="/chat" activeClassName="active">
            <MessageCircleIcon />
            채팅
          </Styled.BottomLink>
        </Styled.BottomLi>
        <Styled.BottomLi>
          <Styled.BottomLink to="/write" activeClassName="active">
            <SquarePlusIcon />
            게시물작성
          </Styled.BottomLink>
        </Styled.BottomLi>
        <Styled.BottomLi>
          <Styled.BottomLink to="/myProfile" activeClassName="active">
            <UserIcon />
            프로필
          </Styled.BottomLink>
        </Styled.BottomLi>
      </Styled.BottomUl>
    </Styled.BottomNav>
  );
};
export default BottomNavBar;
