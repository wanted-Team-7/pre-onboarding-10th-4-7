import App from './App';
import ReactDOM from 'react-dom';
import { ThemeProvider } from 'styled-components';
import Theme from './styles/theme';
import GlobalStyles from './styles/globalStyle';
import { TodoProvider } from './context/TodoProvider';

ReactDOM.render(
  <TodoProvider>
    <ThemeProvider theme={Theme}>
      <GlobalStyles />
      <App />
    </ThemeProvider>
  </TodoProvider>,
  document.getElementById('root')
);
