import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes } from 'react-router-dom';
import App from './App.jsx';
import { GlobalStyle } from './styles/Globalstyle.style.js';
import theme from './styles/theme.js';
import { ThemeProvider } from 'styled-components';
import ScrollToTop from './components/scrollTop/ScrollToTop.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <ScrollToTop />
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <App />
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>
);
