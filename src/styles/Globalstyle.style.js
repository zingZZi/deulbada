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
      color: ${({ theme }) => theme.colors.black};
      font-size: ${({ theme }) => theme.fontSize.base};
      font-weight: ${({ theme }) => theme.fonts.weights.medium};
    }
    button{
      background-color: transparent;
      border:none;
    }
    img{
      max-width: 100%;
    }
    li{
      list-style: none;
    }
    a{
      text-decoration: none;
      color:inherit;
      font-family: ${({ theme }) => theme.fonts.base};
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
    html, body, div, span, applet, object, iframe, h1, h2, h3, h4, h5, h6, p, blockquote, pre, a, abbr, acronym, address, big, cite, code, del, dfn, em, img, ins, kbd, q, s, samp, small, strike, strong, sub, sup, tt, var, b, u, i, center, dl, dt, dd, menu, ol, ul, li, fieldset, form, label, legend, table, caption, tbody, tfoot, thead, tr, th, td, article, aside, canvas, details, embed, figure, figcaption, footer, header, hgroup, main, menu, nav, output, ruby, section, summary, time, mark, audio, video{
      font-family: ${({ theme }) => theme.fonts.base};
    }
    @media (min-width: 500px) {
      html{
        font-size:12px;
      }
    }
`;
