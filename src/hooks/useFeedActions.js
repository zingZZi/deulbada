/* eslint-disable no-case-declarations */
/* eslint-disable no-unused-vars */
import { usePopup } from '../context/PopupContext';
import { usePageActions } from '../context/PageActionsContext';

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

  // 현재 사용자 ID를 가져오는 함수 (실제 구현에 맞게 수정)
  const getCurrentUserId = () => {
    // 예시: localStorage, context, 또는 다른 상태관리에서 가져오기
    return localStorage.getItem('account_id') || null;
  };

  // 게시물 소유자인지 확인하는 함수
  const isOwner = (feedData) => {
    const currentUserId = getCurrentUserId();
    return currentUserId && feedData?.account_id === currentUserId;
  };

  const handleFeedAction = (actionKey, feedData) => {
    console.log('handleFeedAction called with:', actionKey, feedData);

    switch (actionKey) {
      case 'openFeedMenu':
        const isMyPost = isOwner(feedData);

        let menuList = [];

        if (isMyPost) {
          // 내 게시물인 경우: 삭제, 수정만 (신고 없음)
          menuList = [
            {
              label: '삭제',
              action: () => {
                // 모달 설정을 먼저 저장한 후 팝업 닫고 모달 열기
                const modalData = {
                  modalList: [
                    { text: '취소', action: () => closeModal() },
                    { text: '삭제', action: () => console.log('삭제') },
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
        const isMyComment = isOwner(feedData); // feedData에 댓글 정보가 들어온다고 가정

        let commentMenuList = [];

        if (isMyComment) {
          // 내 댓글인 경우: 삭제, 수정만 (신고 없음)
          commentMenuList = [
            {
              label: '삭제',
              action: () => {
                const modalData = {
                  modalList: [
                    { text: '취소', action: () => closeModal() },
                    { text: '삭제', action: () => console.log('댓글 삭제') },
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
    }
  };

  return {
    handleFeedAction,
  };
};

export default useFeedActions;
