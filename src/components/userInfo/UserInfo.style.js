import styled from 'styled-components';

const StyledUserInfo = styled.div`
  display: flex;
  gap: 1.2rem;
  align-items: center;
`;
const StyledProfileBox = styled.div`
  width: 4.2rem;
  height: 4.2rem;
  border-radius: 50%;
  overflow: hidden;
`;
const StyledUserName = styled.p`
  font-size: 1.4rem;
  margin-bottom: 2px;
`;
const StyledUserId = styled.span`
  font-size: 1.2rem;
  color: ${({ theme }) => theme.colors.white700};
`;

export { StyledUserInfo, StyledProfileBox, StyledUserName, StyledUserId };
