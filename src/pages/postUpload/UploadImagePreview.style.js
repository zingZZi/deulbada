import styled from 'styled-components';

export const PreviewWrapper = styled.div`
  position: relative;
  width: 168px;
  height: 126px;
  border-radius: 12px;
  overflow: hidden;
  flex: 0 0 auto;
  scroll-snap-align: start;
  background: ${({ theme }) => theme.colors.white200};
`;

export const PreviewImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const DeleteButton = styled.button`
  position: absolute;
  top: 4px;
  right: 4px;
  background-color: rgba(0, 0, 0, 0.6);
  color: ${({ theme }) => theme.colors.white100};
  border: none;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  font-size: ${({ theme }) => theme.fontSize.small};
  cursor: pointer;
`;
