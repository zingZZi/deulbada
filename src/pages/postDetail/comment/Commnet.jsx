import { forwardRef, useImperativeHandle, useState, useEffect } from 'react';
import * as Styled from './Comment.style';
import { getComments } from '../../../api/postApi';

const Comment = forwardRef(({ postId }, ref) => {
  const [comments, setComments] = useState([]);

  const fetchComments = async () => {
    try {
      if (postId) {
        const response = await getComments(postId);
        setComments(response.data.results);
      }
    } catch (error) {
      console.error('댓글 불러오기 실패:', error);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [postId]);

  // 부모 컴포넌트에서 호출할 수 있는 함수들 노출
  useImperativeHandle(ref, () => ({
    addNewComment: (newComment) => {
      setComments((prev) => [newComment, ...prev]);
    },
    refreshComments: fetchComments,
  }));
  return (
    <Styled.commentWrap>
      {comments.map((e) => {
        return (
          <Styled.commentItem>
            <Styled.commentUserInfo>
              <Styled.ProfileImgBox>
                <img src={e.user.profile_image} alt="프로필이미지" />
              </Styled.ProfileImgBox>
              <div>
                {e.user.username} <span>{e.created_at}</span>
              </div>
            </Styled.commentUserInfo>
            <Styled.commentContent>{e.content}</Styled.commentContent>
          </Styled.commentItem>
        );
      })}
    </Styled.commentWrap>
  );
});

Comment.displayName = 'Comment';

export default Comment;
