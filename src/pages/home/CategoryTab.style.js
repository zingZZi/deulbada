import styled from 'styled-components';

export const CategoryLayout = styled.section`
  border-radius: 1.6rem 1.6rem 0 0;
  box-shadow: 0 -1px 8px -1px rgb(73 73 73 / 25%);
`;
export const CategoryMainTabs = styled.ul`
  display: flex;
  border-bottom: 1px solid #f1f1f1;
`;
export const CategoryMainItem = styled.li`
  width: 50%;
  text-align: center;
`;
export const CategoryMainButton = styled.button`
  font-size: 1.6rem;
  padding: 1.4rem 0;
  width: 64%;
  color: ${({ theme }) => theme.colors.white500};
  font-weight: ${({ theme }) => theme.fonts.weights.bold};
  position: relative;
  &.off {
    color: ${({ theme }) => theme.colors.black};
    &::after {
      content: '';
      bottom: 0%;
      left: 0;
      position: absolute;
      width: 100%;
      height: 3px;
      background-color: ${({ theme }) => theme.colors.black};
    }
  }
  &.active {
    color: ${({ theme }) => theme.colors.primary};
    &::after {
      content: '';
      bottom: 0%;
      left: 0;
      position: absolute;
      width: 100%;
      height: 3px;
      background-color: ${({ theme }) => theme.colors.primary};
    }
  }
`;
export const CategorySubList = styled.ul`
  padding: 1.8rem 3.3rem 1.4rem;
  gap: 1.1rem 0;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  align-content: center;
  text-align: center;
  li {
    width: calc((100% - 3.3rem) / 4);
    cursor: pointer;
    &.active {
      div {
        box-shadow: 0 0 0 5px ${({ theme }) => theme.colors.primary};
      }
      span {
        color: ${({ theme }) => theme.colors.primary};
      }
    }
  }
`;
export const CategorySubItem = styled.div`
  background-color: pink;
  width: 100%;
  padding-top: 100%;
  border-radius: 10px;
  position: relative;
  overflow: hidden;
  margin-bottom: 0.5rem;
  img {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`;
export const CategorySubTitle = styled.span`
  color: #515151;
  font-size: ${({ theme }) => theme.fontSize.small};
  line-height: 1.17em;
`;
