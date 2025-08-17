import styled from 'styled-components';
import { boxImgWrap } from '../../styles/Common.style';

export const Container = styled.div`
  min-height: calc(100vh - 4.8rem);
  position: relative;
  padding-bottom: 7rem;
`;
export const PostSection = styled.section`
  padding: 2rem 1.6rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.white300};
`;
export const PostWrapper = styled.article`
  position: relative;
`;

export const PostImage = styled.img`
  display: block;
  width: 100%;
  max-width: 350px;
  border-radius: 10px;
  margin: 0 auto 12px;
`;
export const CommentSection = styled.section``;
export const HeightWrap = styled.div`
  max-height: calc(100vh - 7rem - 4.8rem);
  overflow-y: auto;
`;
export const CommentInputWrapper = styled.div`
  position: fixed;
  bottom: 0;
  width: 100%;
  left: 50%;
  transform: translateX(-50%);
  max-width: 640px;
  display: flex;
  background-color: ${({ theme }) => theme.colors.white100};
  align-items: center;
  gap: 8px;
  border-top: 1px solid ${({ theme }) => theme.colors.white300};
  padding: 1.2rem 1.6rem;

  .input-area {
    display: flex;
    flex-direction: column;
    flex: 1;
  }

  input {
    flex: 1;
    padding: 0.8rem;
    border: none;
    border-radius: 2rem;
    font-size: ${({ theme }) => theme.fontSize.base};
    color: ${({ theme }) => theme.colors.black};
  }

  button {
    color: ${({ theme }) => theme.colors.white400};
    border: none;
    padding: 0 12px;
    border-radius: 4px;
    cursor: pointer;
    font-size: ${({ theme }) => theme.fontSize.base};
    background: transparent;
    transition: color 0.2s ease;

    &.active {
      color: ${({ theme }) => theme.colors.primary};
    }

    &:disabled {
      cursor: not-allowed;
      opacity: 0.5;
    }
  }
`;
export const ImgWrap = styled.figure`
  width: 10%;
  padding-top: 10%;
  border-radius: 50%;
  max-width: 7rem;
  overflow: hidden;
  ${boxImgWrap}
`;
