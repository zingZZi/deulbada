import styled from 'styled-components';
export const ProfileBg = styled.div`
  background-color: ${({ theme }) => theme.colors.white200};
`;
export const FeedSection = styled.section`
  background-color: ${({ theme }) => theme.colors.white100};
`;
export const FeedTypeBtns = styled.ul`
  display: flex;
  justify-content: flex-end;
  padding: 0.9rem 1.6rem;
  gap: 1.6rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.white300};
`;
export const FeedList = styled.ul`
  padding: 1.6rem 1.6rem 8rem;
  &.list-type {
  }
  &.gallery-type {
    display: flex;
    gap: 0.8rem;
  }
`;
export const FeedListItem = styled.li`
  width: calc((100% - 1.6rem) / 3);
`;
