import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';
import fonts from './font';
export const GlobalStyle = createGlobalStyle`
    ${reset}  
    ${fonts} 
    * {
      box-sizing: border-box;
      font-family: ${({ theme }) => theme.fonts.base};
    }
    html{
      font-size: 10px;
    }
    body{
      font-size: ${({ theme }) => theme.fontSize.base};
      font-weight: ${({ theme }) => theme.fonts.weights.medium};
    }
    button{
      background-color: transparent;
      border:none;
    }
    li{
      list-style: none;
    }
    a{
      text-decoration: none;
      color:inherit
    }
    button{
      padding:0;
      background-color: transparent;
      border:none;
      cursor: pointer;
      font-size: inherit;
    }
    .text-ir{
      font-size: 0%;
      text-indent:-99999px;
    }
`;
