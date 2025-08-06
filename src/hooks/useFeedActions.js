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

  const handleFeedAction = (actionKey, feedData) => {
    console.log('handleFeedAction called with:', actionKey, feedData);

    switch (actionKey) {
      case 'openFeedMenu':
        openPopup({
          list: [
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
            {
              label: '신고',
              action: () => {
                console.log('피드 신고', feedData);
                closePopup();
              },
            },
          ],
          text: '정말 삭제하시겠습니까?',
        });
        break;

      case 'openCommentMenu':
        openPopup({
          list: [
            {
              label: '신고',
              action: () => {
                console.log('댓글 수정', feedData);
                closePopup();
              },
            },
          ],
        });
        break;
    }
  };

  return {
    handleFeedAction,
  };
};

export default useFeedActions;
