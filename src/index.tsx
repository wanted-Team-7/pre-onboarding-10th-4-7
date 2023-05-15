import App from './App';
import ReactDOM from 'react-dom';
import { ThemeProvider } from 'styled-components';
import Theme from './styles/theme';
import GlobalStyles from './styles/globalStyle';
import { TodoProvider } from './context/TodoProvider';
import { SearchProvider } from './context/SearchProvider';

ReactDOM.render(
  <TodoProvider>
    <SearchProvider>
      <ThemeProvider theme={Theme}>
        <GlobalStyles />
        <App />
      </ThemeProvider>
    </SearchProvider>
  </TodoProvider>,
  document.getElementById('root')
);
