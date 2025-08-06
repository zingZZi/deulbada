import { useState } from 'react';

const usePopupActions = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [popupConfig, setPopupConfig] = useState(null);
  const [isModalPopOpen, setIsModalPopOpen] = useState(false);

  const openPopup = (config) => {
    setIsPopupOpen(true);
    setPopupConfig(config);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
    setPopupConfig(null);
  };

  const openModal = () => {
    setIsPopupOpen(false);
    setIsModalPopOpen(true);
  };

  const closeModal = () => {
    setIsModalPopOpen(false);
  };

  return {
    isPopupOpen,
    popupConfig,
    isModalPopOpen,
    openPopup,
    closePopup,
    openModal,
    closeModal,
    setIsPopupOpen,
    setIsModalPopOpen,
  };
};

export default usePopupActions;
