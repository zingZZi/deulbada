import { createContext, useContext, useState } from 'react';

const PopupContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const usePopup = () => {
  const context = useContext(PopupContext);
  if (!context) {
    throw new Error('usePopup must be used within PopupProvider');
  }
  return context;
};

export const PopupProvider = ({ children }) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [popupConfig, setPopupConfig] = useState(null);
  const [isModalPopOpen, setIsModalPopOpen] = useState(false);
  const [modalConfig, setModalConfig] = useState(null); // 모달 설정을 별도로 관리

  const openPopup = (config) => {
    setIsPopupOpen(true);
    setPopupConfig(config);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
    setPopupConfig(null);
  };

  const openModal = (config = null) => {
    // 모달 설정이 따로 전달되면 사용하고, 아니면 현재 popupConfig에서 가져옴
    const modalData =
      config ||
      (popupConfig
        ? {
            modalList: popupConfig.modalList,
            text: popupConfig.text,
          }
        : null);

    setModalConfig(modalData);
    setIsModalPopOpen(true);
  };

  const closeModal = () => {
    setIsModalPopOpen(false);
    setModalConfig(null);
  };

  return (
    <PopupContext.Provider
      value={{
        isPopupOpen,
        popupConfig,
        isModalPopOpen,
        modalConfig, // 모달 설정 추가
        openPopup,
        closePopup,
        openModal,
        closeModal,
        setIsPopupOpen,
        setIsModalPopOpen,
      }}
    >
      {children}
    </PopupContext.Provider>
  );
};
