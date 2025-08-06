import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';
import { BasicBtn, LineBtn, NolineIconBtn } from '../../styles/Button.style';
export const UserInfoLayout = styled(Link)`
  display: flex;
  gap: 1.2rem;
  align-items: flex-start;
  position: relative;
`;
export const ProfileBox = styled.div`
  width: 12%;
  height: 0;
  padding-top: 12%;
  border-radius: 50%;
  overflow: hidden;
  position: relative;
  img {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`;

export const InfoBox = styled.div`
  width: calc(88% - 1.2rem);
  position: relative;
`;
export const UserName = styled.p`
  grid-area: username;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  font-size: 1.4rem;
  margin-bottom: 2px;
  gap: 0.3rem;
`;
export const UserId = styled.p`
  font-size: 1.2rem;
  font-weight: ${({ theme }) => theme.fonts.weights.regular};
  color: ${({ theme }) => theme.colors.white700};
`;
export const MoreBtn = styled(NolineIconBtn)`
  position: absolute;
  right: 0;
  top: 0;
`;

export const Highlight = styled.span`
  color: ${({ theme }) => theme.colors.primary};
  font-weight: bold;
  background: transparent; // mark 스타일 없애기
`;

const followBtns = css`
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  min-width: 5.6rem;
`;

export const FollwerBtn = styled(BasicBtn)`
  ${followBtns}
`;
export const FollwerLineBtn = styled(LineBtn)`
  ${followBtns}
`;
