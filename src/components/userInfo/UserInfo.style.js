import styled from 'styled-components';

export const UserInfoLayout = styled.div`
  display: flex;
  gap: 1.2rem;
  align-items: center;
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
export const UserName = styled.p`
  font-size: 1.4rem;
  margin-bottom: 2px;
`;
export const UserId = styled.span`
  font-size: 1.2rem;
  color: ${({ theme }) => theme.colors.white700};
`;
