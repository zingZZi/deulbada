import styled from 'styled-components';

export const Container = styled.div`
  padding-bottom: 70px;
  max-width: 640px;
`;

export const PostWrapper = styled.div`
  display: flex;
  margin: 20px 16px;

  .profile {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin-right: 12px;
    object-fit: cover;
  }

  .post-body {
    flex: 1;
  }

  .post-header {
    display: flex;
    align-items: center;
    font-size: ${({ theme }) => theme.fontSize.base};
    color: ${({ theme }) => theme.colors.black};

    .post-header-names {
      display: flex;
      flex-direction: column;
      gap: 2px;
      margin-bottom: 16px;
    }

    .username {
      font-weight: ${({ theme }) => theme.fonts.weights.medium};
      color: ${({ theme }) => theme.colors.black};
    }

    .account {
      color: ${({ theme }) => theme.colors.white700};
      font-size:${({ theme }) => theme.fontSize.small};
    }
  }

  .post-content-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;  
  }

  .content {
    word-break: keep-all;
    font-size: ${({ theme }) => theme.fontSize.base};
    line-height: ${({ theme }) => theme.fontSize.xLarge};
    margin-bottom: 16px;
  }

  .post-info {
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: ${({ theme }) => theme.fontSize.small};
    color: ${({ theme }) => theme.colors.white700};
    margin-bottom: 16px;
  }

  .post-time {
    display: block;
    font-size: ${({ theme }) => theme.fontSize.xSmall};
    color: ${({ theme }) => theme.colors.white600};
  }
`;

export const PostImage = styled.img`
  display: block;
  width: 100%;
  max-width: 350px;
  border-radius: 10px;
  margin: 0 auto 12px; 
`;

export const CommentList = styled.ul`
  list-style: none;
  margin-bottom: 16px;
  border-top: 1px solid ${({ theme }) => theme.colors.white300};
  padding-top: 16px;

  li {
    display: flex;
    align-items: flex-start;
    padding: 8px 16px;
  }

  .profile {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    margin-right: 12px;
    object-fit: cover;
  }

  .comment-body {
    flex: 1;
    min-width: 0;
  }

  .comment-header {
    display: flex;
    align-items: center;

    .comment-author {
      font-weight: ${({ theme }) => theme.fonts.weights.medium};
      color: ${({ theme }) => theme.colors.black};
    }

    .comment-time {
      font-size: ${({ theme }) => theme.fontSize.xSmall};
      color: ${({ theme }) => theme.colors.white600};

      &::before {
        content: '·';
        margin: 0 6px;
      }
    }
  }

  .comment-content {
    max-width: 600px;
    font-size: ${({ theme }) => theme.fontSize.base};
    margin-top: 2px;
    overflow-wrap: break-word;
    word-break: break-word;
    line-height: ${({ theme }) => theme.fontSize.xLarge};
  }
`;

export const CommentInputWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 8px;
  border-top: 1px solid ${({ theme }) => theme.colors.white300};
  padding: 12px 16px;

  .profile {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    object-fit: cover;
  }

  .input-area {
    display: flex;
    flex-direction: column;
    flex: 1;
  }

  input {
    flex: 1;
    padding: 8px;
    border: none;
    border-radius: 20px;
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
