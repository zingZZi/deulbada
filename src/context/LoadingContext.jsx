/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useState, useCallback } from 'react';

// Loading Context 생성
const LoadingContext = createContext();

// Loading Provider 컴포넌트
export const LoadingProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);

  // 로딩 시작
  const startLoading = useCallback(() => {
    console.log('로딩 시작'); // 디버깅용
    setIsLoading(true);
  }, []);

  // 로딩 종료
  const stopLoading = useCallback(() => {
    console.log('로딩 종료'); // 디버깅용
    setIsLoading(false);
  }, []);

  // 로딩 강제 종료
  const resetLoading = useCallback(() => {
    console.log('로딩 리셋'); // 디버깅용
    setIsLoading(false);
  }, []);

  const value = {
    isLoading,
    startLoading,
    stopLoading,
    resetLoading,
  };

  return <LoadingContext.Provider value={value}>{children}</LoadingContext.Provider>;
};

// Loading Hook
export const useLoading = () => {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error('useLoading must be used within a LoadingProvider');
  }
  return context;
};
