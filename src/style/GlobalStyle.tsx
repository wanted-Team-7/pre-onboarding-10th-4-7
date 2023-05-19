import { createGlobalStyle } from 'styled-components';
import theme from './theme';

const GlobalStyle = createGlobalStyle`
  * {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: "Segoe UI", Arial, sans-serif;
  line-height: 1.4;
  height: 100vh;
  
  color: ${theme.deepGray};
  background: ${theme.white};
}
`;

export default GlobalStyle;
