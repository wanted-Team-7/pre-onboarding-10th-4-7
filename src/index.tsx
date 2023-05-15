import App from './App';
import ReactDOM from 'react-dom';
import { StrictMode } from 'react';
import { ThemeProvider } from 'styled-components';
import Theme from './styles/theme';
import GlobalStyles from './styles/globalStyle';

ReactDOM.render(
  <StrictMode>
    <ThemeProvider theme={Theme}>
      <GlobalStyles />
      <App />
    </ThemeProvider>
  </StrictMode>,
  document.getElementById('root')
);
