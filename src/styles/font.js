// src/styles/fonts.js
import { css } from "styled-components";

const fonts = css`
  @font-face {
    font-family: "Spoqa Han Sans Neo";
    src: url("/fonts/SpoqaHanSansNeo/SpoqaHanSansNeo-Thin.woff2")
        format("woff2"),
      url("/fonts/SpoqaHanSansNeo/SpoqaHanSansNeo-Thin.woff") format("woff"),
      url("/fonts/SpoqaHanSansNeo/SpoqaHanSansNeo-Thin.ttf") format("truetype");
    font-weight: 100;
    font-style: normal;
  }
  @font-face {
    font-family: "Spoqa Han Sans Neo";
    src: url("/fonts/SpoqaHanSansNeo/SpoqaHanSansNeo-Light.woff2")
        format("woff2"),
      url("/fonts/SpoqaHanSansNeo/SpoqaHanSansNeo-Light.woff") format("woff"),
      url("/fonts/SpoqaHanSansNeo/SpoqaHanSansNeo-Light.ttf") format("truetype");
    font-weight: 300;
    font-style: normal;
  }

  @font-face {
    font-family: "Spoqa Han Sans Neo";
    src: url("/fonts/SpoqaHanSansNeo/SpoqaHanSansNeo-Regular.woff2")
        format("woff2"),
      url("/fonts/SpoqaHanSansNeo/SpoqaHanSansNeo-Regular.woff") format("woff"),
      url("/fonts/SpoqaHanSansNeo/SpoqaHanSansNeo-Regular.ttf")
        format("truetype");
    font-weight: 400;
    font-style: normal;
  }

  @font-face {
    font-family: "Spoqa Han Sans Neo";
    src: url("/fonts/SpoqaHanSansNeo/SpoqaHanSansNeo-Medium.woff2")
        format("woff2"),
      url("/fonts/SpoqaHanSansNeo/SpoqaHanSansNeo-Medium.woff") format("woff"),
      url("/fonts/SpoqaHanSansNeo/SpoqaHanSansNeo-Medium.ttf")
        format("truetype");
    font-weight: 500;
    font-style: normal;
  }

  @font-face {
    font-family: "Spoqa Han Sans Neo";
    src: url("/fonts/SpoqaHanSansNeo/SpoqaHanSansNeo-Bold.woff2")
        format("woff2"),
      url("/fonts/SpoqaHanSansNeo/SpoqaHanSansNeo-Bold.woff") format("woff"),
      url("/fonts/SpoqaHanSansNeo/SpoqaHanSansNeo-Bold.ttf") format("truetype");
    font-weight: 700;
    font-style: normal;
  }
`;

export default fonts;
