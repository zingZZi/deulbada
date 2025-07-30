import styled from 'styled-components';

export const UserInfoLayout = styled.div`
  display: flex;
  gap: 1.2rem;
  align-items: center;
`;
export const ProfileBox = styled.div`
  width: 4.2rem;
  height: 4.2rem;
  border-radius: 50%;
  overflow: hidden;
`;
export const UserName = styled.p`
  font-size: 1.4rem;
  margin-bottom: 2px;
`;
export const UserId = styled.span`
  font-size: 1.2rem;
  color: ${({ theme }) => theme.colors.white700};
`;
