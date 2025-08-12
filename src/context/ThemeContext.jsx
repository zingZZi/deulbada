/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useCallback } from 'react';
import { ThemeProvider } from 'styled-components';
import theme from '../styles/theme.js';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a CustomThemeProvider');
  }
  return context;
};

export const CustomThemeProvider = ({ children }) => {
  const [dynamicTheme, setDynamicTheme] = useState(theme);

  const updateTheme = useCallback((newTheme) => {
    setDynamicTheme(newTheme);
  }, []);

  const resetTheme = useCallback(() => {
    setDynamicTheme(theme);
  }, []);

  return (
    <ThemeContext.Provider
      value={{
        theme: dynamicTheme,
        updateTheme,
        resetTheme,
      }}
    >
      <ThemeProvider theme={dynamicTheme}>{children}</ThemeProvider>
    </ThemeContext.Provider>
  );
};
