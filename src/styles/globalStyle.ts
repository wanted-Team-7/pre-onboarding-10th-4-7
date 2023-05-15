import { createGlobalStyle } from 'styled-components';

const globalStyles = createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
  body {
    font-family: "Segoe UI", Arial, sans-serif;
    line-height: 1.4;
    color: #444;
    background: #fff;
    height: 100vh;
  }
`;

export default globalStyles;
