import styled from 'styled-components';
export const ProfileInfo = styled.section`
  padding: 3rem 0 2.6rem;
  text-align: center;
  border: 1px solid ${({ theme }) => theme.colors.white300};
  font-weight: ${({ theme }) => theme.fonts.weights.regular};
`;
export const profileSmmary = styled.ul`
  display: flex;
  gap: 4rem;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.6rem;
`;
export const followInfo = styled.li`
  font-size: 1rem;
  text-align: center;
  color: ${({ theme }) => theme.colors.white700};
  b {
    color: ${({ theme }) => theme.colors.black};
    font-weight: ${({ theme }) => theme.fonts.weights.bold};
    font-size: ${({ theme }) => theme.fontSize.xLarge};
    display: block;
  }
`;

export const ProfileImgWrap = styled.figure`
  border-radius: 50%;
  width: 11rem;
  padding-top: 11rem;
  overflow: hidden;
  position: relative;
  img {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`;
export const UserName = styled.h3`
  font-size: ${({ theme }) => theme.fontSize.large};
  font-weight: ${({ theme }) => theme.fonts.weights.bold};
  line-height: 100%;
`;
export const UserId = styled.p`
  font-size: ${({ theme }) => theme.fontSize.small};
  color: ${({ theme }) => theme.colors.white700};
  margin: 0.6rem 0 1.6rem;
`;
export const UserBio = styled.p`
  font-size: ${({ theme }) => theme.fontSize.base};
  color: ${({ theme }) => theme.colors.white700};
`;

export const ProfileActions = styled.ul`
  margin-top: 2.4rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  li {
    svg {
      width: 2rem;
      height: 2rem;
    }
  }
`;
