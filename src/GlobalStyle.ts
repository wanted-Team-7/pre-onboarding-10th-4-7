import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

export const GlobalStyle = createGlobalStyle`
  ${reset}

body {
  font-family: 'Segoe UI', Arial, sans-serif;
  line-height: 1.4;
  color: #444;
  background: #fff;
  height: 100vh;
}
`;
