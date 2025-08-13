/* eslint-disable no-case-declarations */
/* eslint-disable no-unused-vars */
import { usePopup } from '../context/PopupContext';
import { usePageActions } from '../context/PageActionsContext';
import { delePost } from '../api/postApi';

const useFeedActions = () => {
  // 전역 팝업 컨텍스트 사용
  const { openPopup, closePopup, openModal, closeModal } = usePopup();

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
    // 🔥 게시글 작성자 ID 확인 로직
    const authorId = feedData?.author?.account_id || feedData?.account_id;
    return currentUserId && authorId === currentUserId;
  };

  // 🔥 게시물 삭제 API - 콜백 함수 포함
  const handleDeletePost = async (postId, onPostDeleted) => {
    try {
      await delePost(postId);
      console.log('게시물 삭제 성공');

      // 🔥 삭제 성공 시 콜백 함수 호출하여 UI에서 제거
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

  // 🔥 handleFeedAction - 콜백 파라미터 받도록 수정
  const handleFeedAction = (actionKey, feedData, onPostDeleted = null) => {
    console.log('handleFeedAction called with:', actionKey, feedData);

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
                // 🔥 게시물 ID 찾기
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
                        // 🔥 콜백 함수를 포함하여 삭제 처리
                        await handleDeletePost(postId, onPostDeleted);
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
                console.log('피드 수정', feedData);
                closePopup();
              },
            },
          ];
        } else {
          // 남의 게시물인 경우: 신고만
          menuList = [
            {
              label: '신고',
              action: () => {
                console.log('피드 신고', feedData);
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

      case 'openCommentMenu':
        const isMyComment = isOwner(feedData);

        let commentMenuList = [];

        if (isMyComment) {
          // 내 댓글인 경우: 삭제, 수정만
          commentMenuList = [
            {
              label: '삭제',
              action: () => {
                const modalData = {
                  modalList: [
                    { text: '취소', action: () => closeModal() },
                    {
                      text: '삭제',
                      action: async () => {
                        closeModal();
                        console.log('댓글 삭제', feedData);
                        // 여기에 댓글 삭제 API 및 콜백 처리 구현
                      },
                    },
                  ],
                  text: '댓글을 삭제할까요?',
                };
                closePopup();
                openModal(modalData);
              },
            },
            {
              label: '수정',
              action: () => {
                console.log('댓글 수정', feedData);
                closePopup();
              },
            },
          ];
        } else {
          // 남의 댓글인 경우: 신고만
          commentMenuList = [
            {
              label: '신고',
              action: () => {
                console.log('댓글 신고', feedData);
                closePopup();
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
