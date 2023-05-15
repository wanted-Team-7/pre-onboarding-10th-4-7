import App from './App';
import ReactDOM from 'react-dom';
import { StrictMode } from 'react';
import GlobalStyles from './styles/globalStyle';

ReactDOM.render(
  <StrictMode>
    <GlobalStyles />
    <App />
  </StrictMode>,
  document.getElementById('root')
);
