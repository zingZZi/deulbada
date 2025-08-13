import styled from 'styled-components';

export const ActionSheetBg = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 9;
`;

export const ActionSheet = styled.ul`
  position: absolute;
  bottom: 0;
  width: 100%;
  background-color: white;
  border-radius: 1rem 1rem 0 0;
  padding: 1.6rem 0 1rem;
  transition: transform 0.3s ease;
  touch-action: none;
`;

export const ActionItem = styled.li`
  padding: 1.4rem 2.6rem;
  font-size: ${({ theme }) => theme.fontSize.base};
  line-height: 1.8rem;
  cursor: pointer;
`;

export const DragIndicator = styled.i`
  display: block;
  width: 5rem;
  height: 0.4rem;
  background-color: ${({ theme }) => theme.colors.white300};
  border-radius: 0.5rem;
  margin: 0 auto 1.6rem;
`;
