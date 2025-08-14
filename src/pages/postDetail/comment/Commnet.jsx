import { forwardRef, useImperativeHandle, useState, useEffect } from 'react';
import * as Styled from './Comment.style';
import { getComments } from '../../../api/postApi';
import { EllipsisVerticalIcon } from '../../../components/icon/Icons';
import useFeedActions from '../../../hooks/useFeedActions';

// 시간 포맷 함수
const formatTimeDisplay = (timeString) => {
  const now = new Date();
  const targetTime = new Date(timeString);

  // 시간 차이를 밀리초로 계산
  const diffMs = now - targetTime;

  // 밀리초를 분, 시간, 일로 변환
  const diffMinutes = Math.floor(diffMs / (1000 * 60));
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  // 하루(24시간) 미만인 경우
  if (diffDays < 1) {
    if (diffHours < 1) {
      if (diffMinutes < 1) {
        return '방금 전';
      }
      return `${diffMinutes}분 전`;
    }
    return `${diffHours}시간 전`;
  }

  // 하루 이상인 경우 - 년/월/일 형식으로 반환
  const year = targetTime.getFullYear();
  const month = String(targetTime.getMonth() + 1).padStart(2, '0');
  const day = String(targetTime.getDate()).padStart(2, '0');

  return `${year}/${month}/${day}`;
};

const Comment = forwardRef(({ postId, onCommentCountChange }, ref) => {
  const [comments, setComments] = useState([]);
  const { handleFeedAction } = useFeedActions();

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

  useImperativeHandle(ref, () => ({
    addNewComment: (newComment) => {
      setComments((prev) => [newComment, ...prev]);
    },
    refreshComments: fetchComments,
    removeComment: (commentId) => {
      setComments((prev) => prev.filter((comment) => comment.id !== commentId));
    },
  }));

  // 댓글 삭제 콜백 함수
  const handleCommentDeleted = (commentId) => {
    // Comment 컴포넌트 내부에서 댓글 제거
    setComments((prev) => prev.filter((comment) => comment.id !== commentId));

    // 🔥 부모 컴포넌트(PostDetail)에 알려서 카운트 업데이트
    if (onCommentCountChange) {
      onCommentCountChange();
    }
  };

  // 댓글 데이터 구성 함수 (useFeedActions에 맞게)
  const getCommentDataForAction = (comment) => {
    return {
      id: comment.id,
      commentId: comment.id,
      user: {
        ...comment.user,
        account_id: comment.user.account_id,
      },
      userId: comment.user.account_id,
      username: comment.user.username,
      profile_image: comment.user.profile_image,
      content: comment.content,
      created_at: comment.created_at,
      postId: postId,
    };
  };

  // localStorage에서 사용자 정보 가져오기
  const accountId = localStorage.getItem('account_id');
  return (
    <>
      {comments.length > 0 ? (
        <Styled.commentWrap>
          {comments.map((e) => {
            return (
              <Styled.commentItem key={e.id}>
                <Styled.commentUserInfo>
                  <Styled.ProfileImgBox>
                    <img src={e.user.profile_image} alt="프로필이미지" />
                  </Styled.ProfileImgBox>
                  <Styled.UserName>
                    {e.user.username} <Styled.Time>{formatTimeDisplay(e.created_at)}</Styled.Time>
                  </Styled.UserName>

                  {accountId === e.user.account_id ? (
                    <Styled.MoreBtn
                      onClick={() => {
                        handleFeedAction(
                          'openCommentMenu',
                          getCommentDataForAction(e),
                          handleCommentDeleted
                        );
                      }}
                    >
                      <EllipsisVerticalIcon size={'1.8rem'} />
                      <span className="text-ir">더보기</span>
                    </Styled.MoreBtn>
                  ) : null}
                </Styled.commentUserInfo>
                <Styled.CommentContent>{e.content}</Styled.CommentContent>
              </Styled.commentItem>
            );
          })}
        </Styled.commentWrap>
      ) : null}
    </>
  );
});

Comment.displayName = 'Comment';

export default Comment;
