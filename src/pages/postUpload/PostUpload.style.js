// PostUpload.style.js
import styled from 'styled-components';

export const Container = styled.div`
  padding: 20px;
  max-width: 600px;
  margin: 0 auto;
  padding-bottom: 70px;
  --fab-bottom: 16px;

  background-color: ${({ theme }) => theme.colors.white100};
  font-family: ${({ theme }) => theme.fonts.base};
`;

export const TextAndProfile = styled.div`
  display: flex;
  align-items: flex-start;
`;

export const ProfileImage = styled.img`
  width: 42px;
  height: 42px;
  margin-right: 13px;
  flex-shrink: 0;
  border-radius: 50%;
  object-fit: cover;
`;

export const TextArea = styled.textarea`
  flex: 1;
  height: auto;
  max-height: 480px;
  font-size: ${({ theme }) => theme.fontSize.base};
  color: ${({ theme }) => theme.colors.black};
  background: ${({ theme }) => theme.colors.white100};
  border: none;
  border-radius: 8px;
  resize: none;
  margin-bottom: 16px;
  outline: none;
  overflow: hidden;
  line-height: 1.5;
  box-sizing: border-box;
  min-height: 42px;
  padding-top: calc((42px - 1.5em) / 2);
  padding-bottom: 0;

  ::placeholder {
    color: ${({ theme }) => theme.colors.white600};
  }
`;

export const ImageUploadSection = styled.div`
  margin: 12px 0 20px;
`;

export const PreviewScroller = styled.div`
  display: flex;
  gap: 12px;
  overflow-x: auto;
  padding: 4px 16px 4px 54px;
  scroll-snap-type: x mandatory;
  -webkit-overflow-scrolling: touch;
  touch-action: pan-x;

  scrollbar-width: thin;
  scrollbar-color: ${({ theme }) => theme.colors.white400} transparent;

  &::-webkit-scrollbar { height: 6px; }
  &::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors.white400};
    border-radius: 3px;
  }
`;

export const ImageButtonWrapper = styled.button`
  position: fixed;
  right: calc(16px + env(safe-area-inset-right, 0px));
  bottom: calc(var(--fab-bottom, 16px) + env(safe-area-inset-bottom, 0px));
  width: 56px;
  height: 56px;
  margin: 0;
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.white100};
  border: none;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  z-index: 100;

  &:active {
    background-color: ${({ theme }) => theme.colors.primaryOpacity};
  }
`;

export const HiddenFileInput = styled.input`
  display: none;
`;
