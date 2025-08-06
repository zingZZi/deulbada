/* eslint-disable no-unused-vars */
import { usePageActions } from '../context/PageActionsContext';
import { usePopup } from '../context/PopupContext';

const useHeaderActions = () => {
  const { openPopup, closePopup, openModal, closeModal } = usePopup();

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

  const handleHeaderAction = (actionKey) => {
    console.log('handleHeaderAction called with:', actionKey);
    switch (actionKey) {
      case 'openProfileMenu':
        openPopup({
          text: '로그아웃',
          list: [
            { label: '설정 및 개인정보', action: () => console.log('설정으로 이동') },
            {
              label: '로그아웃',
              action: () => {
                // 모달 설정을 먼저 저장한 후 팝업 닫고 모달 열기
                const modalData = {
                  modalList: [
                    { text: '취소', action: () => closeModal() },
                    { text: '로그아웃', action: () => console.log('로그아웃') },
                  ],
                  text: '로그아웃하시겠어요?',
                };
                closePopup();
                openModal(modalData);
              },
            },
          ],
        });
        break;

      case 'openChatMenu':
        openPopup({
          list: [{ label: '채팅방 나가기', action: () => console.log('채팅방나가기') }],
        });
        break;

      case 'saveProfile':
        console.log('Executing saveProfile action');
        executeAction('saveProfile');
        break;
      case 'savePost':
        executeAction('savePost');
        break;
      case 'deletePost':
        executeAction('deletePost');
        break;

      default:
        console.warn('Unknown action:', actionKey);
    }
  };

  return {
    handleHeaderAction,
  };
};

export default useHeaderActions;
