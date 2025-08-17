/* eslint-disable no-case-declarations */
/* eslint-disable no-unused-vars */
import { usePopup } from '../context/PopupContext';
import { useNavigate } from 'react-router-dom';
import { usePageActions } from '../context/PageActionsContext';
import { delePost, deleteComment, reportComment } from '../api/postApi';

const useFeedActions = () => {
  // 전역 팝업 컨텍스트 사용
  const { openPopup, closePopup, openModal, closeModal } = usePopup();

  const navigate = useNavigate();

  // Context 사용 시 에러 처리
  let executeAction;
  try {
    const pageActionsContext = usePageActions();
    executeAction = pageActionsContext.executeAction;
  } catch (error) {
    console.warn('PageActionsProvider not found, actions will not work');
    executeAction = (actionName) => {
      console.warn(`Action ${actionName} cannot be executed: PageActionsProvider not found`);
    };
  }

  // 현재 사용자 ID를 가져오는 함수
  const getCurrentUserId = () => {
    return localStorage.getItem('account_id') || null;
  };

  // 게시물 소유자인지 확인하는 함수
  const isOwner = (feedData) => {
    const currentUserId = getCurrentUserId();
    // 게시글 작성자 ID 확인 로직
    const authorId = feedData?.author?.account_id || feedData?.account_id || feedData?.userId;
    return currentUserId && authorId === currentUserId;
  };

  // 댓글 소유자인지 확인하는 함수
  const isCommentOwner = (commentData) => {
    const currentUserId = getCurrentUserId();

    const commentAuthorId =
      commentData?.user?.account_id || commentData?.userId || commentData?.user?.id;

    // 타입을 맞춰서 비교 (문자열로 통일)
    const isOwner = currentUserId && String(commentAuthorId) === String(currentUserId);

    return isOwner;
  };

  // 게시물 삭제 API - 콜백 함수 포함
  const handleDeletePost = async (postId, onPostDeleted) => {
    try {
      await delePost(postId);

      // 삭제 성공 시 콜백 함수 호출하여 UI에서 제거
      if (onPostDeleted && typeof onPostDeleted === 'function') {
        onPostDeleted(postId);
      }

      // 성공 메시지 표시
      const successModalData = {
        modalList: [{ text: '확인', action: () => closeModal() }],
        text: '게시물이 삭제되었습니다.',
      };
      openModal(successModalData);
    } catch (error) {
      console.error('게시물 삭제 실패:', error);
      const errorModalData = {
        modalList: [{ text: '확인', action: () => closeModal() }],
        text: '게시물 삭제에 실패했습니다.',
      };
      openModal(errorModalData);
    }
  };

  // 댓글 삭제 API - 콜백 함수 포함
  const handleDeleteComment = async (commentId, onCommentDeleted) => {
    try {
      await deleteComment(commentId);

      // 삭제 성공 시 콜백 함수 호출하여 UI에서 제거
      if (onCommentDeleted && typeof onCommentDeleted === 'function') {
        onCommentDeleted(commentId);
      }

      // 성공 메시지 표시
      const successModalData = {
        modalList: [{ text: '확인', action: () => closeModal() }],
        text: '댓글이 삭제되었습니다.',
      };
      openModal(successModalData);
    } catch (error) {
      console.error('댓글 삭제 실패:', error);
      const errorModalData = {
        modalList: [{ text: '확인', action: () => closeModal() }],
        text: '댓글 삭제에 실패했습니다.',
      };
      openModal(errorModalData);
    }
  };

  // 댓글 신고 처리
  const handleReportComment = async (commentData) => {
    try {
      const commentId = commentData?.id || commentData?.commentId;
      if (!commentId) {
        throw new Error('댓글 ID를 찾을 수 없습니다.');
      }

      await reportComment(commentId);

      const successModalData = {
        modalList: [{ text: '확인', action: () => closeModal() }],
        text: '댓글 신고가 접수되었습니다.',
      };
      openModal(successModalData);
    } catch (error) {
      console.error('댓글 신고 실패:', error);
      const errorModalData = {
        modalList: [{ text: '확인', action: () => closeModal() }],
        text: '댓글 신고에 실패했습니다.',
      };
      openModal(errorModalData);
    }
  };

  // handleFeedAction - 댓글 액션도 포함하도록 확장
  const handleFeedAction = (actionKey, feedData, onDeleted = null) => {
    switch (actionKey) {
      case 'openFeedMenu':
        const isMyPost = isOwner(feedData);

        let menuList = [];

        if (isMyPost) {
          // 내 게시물인 경우: 삭제, 수정만
          menuList = [
            {
              label: '삭제',
              action: () => {
                // 게시물 ID 찾기
                const postId = feedData?.id;
                if (!postId) {
                  console.error('게시물 ID를 찾을 수 없습니다.', feedData);
                  closePopup();
                  return;
                }

                // 삭제 확인 모달 설정
                const modalData = {
                  modalList: [
                    { text: '취소', action: () => closeModal() },
                    {
                      text: '삭제',
                      action: async () => {
                        closeModal(); // 모달 먼저 닫기
                        // 콜백 함수를 포함하여 삭제 처리
                        await handleDeletePost(postId, onDeleted);
                      },
                    },
                  ],
                  text: '게시글을 삭제할까요?',
                };
                closePopup();
                openModal(modalData);
              },
            },
            {
              label: '수정',
              action: () => {
                // 게시물 ID 필수
                const postId = feedData?.id;
                if (!postId) {
                  console.error('게시물 ID를 찾을 수 없습니다.', feedData);
                  closePopup();
                  return;
                }
                closePopup();
                // ✅ 수정 페이지로 이동
                navigate(`/postEdit/${postId}`);
              },
            },
          ];
        } else {
          // 남의 게시물인 경우: 신고만
          menuList = [
            {
              label: '신고',
              action: () => {
                closePopup();
              },
            },
          ];
        }

        openPopup({
          list: menuList,
          text: isMyPost ? '게시글 관리' : '게시글 신고',
        });
        break;

      // 댓글 메뉴 액션 추가
      case 'openCommentMenu':
        const isMyComment = isCommentOwner(feedData);

        let commentMenuList = [];

        if (isMyComment) {
          // 내 댓글인 경우: 삭제만
          commentMenuList = [
            {
              label: '삭제',
              action: () => {
                // 댓글 ID 찾기
                const commentId = feedData?.id || feedData?.commentId;
                if (!commentId) {
                  console.error('댓글 ID를 찾을 수 없습니다.', feedData);
                  closePopup();
                  return;
                }

                const modalData = {
                  modalList: [
                    { text: '취소', action: () => closeModal() },
                    {
                      text: '삭제',
                      action: async () => {
                        closeModal();
                        // 댓글 삭제 처리
                        await handleDeleteComment(commentId, onDeleted);
                      },
                    },
                  ],
                  text: '댓글을 삭제할까요?',
                };
                closePopup();
                openModal(modalData);
              },
            },
          ];
        } else {
          // 남의 댓글인 경우: 신고만
          commentMenuList = [
            {
              label: '신고',
              action: () => {
                const modalData = {
                  modalList: [
                    { text: '취소', action: () => closeModal() },
                    {
                      text: '신고',
                      action: async () => {
                        closeModal();
                        await handleReportComment(feedData);
                      },
                    },
                  ],
                  text: '이 댓글을 신고하시겠습니까?',
                };
                closePopup();
                openModal(modalData);
              },
            },
          ];
        }

        openPopup({
          list: commentMenuList,
          text: isMyComment ? '댓글 관리' : '댓글 신고',
        });
        break;

      default:
        console.warn(`Unknown action: ${actionKey}`);
    }
  };

  return {
    handleFeedAction,
  };
};

export default useFeedActions;
