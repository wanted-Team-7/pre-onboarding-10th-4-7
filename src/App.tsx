import GlobalStyle from './style/GlobalStyle';
import Main from './pages/Main';
import TodoContextProvider from './contexts/TodoContext';
import { ThemeProvider } from 'styled-components';
import theme from './style/theme';

const App = () => {
  return (
    <TodoContextProvider>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Main />
      </ThemeProvider>
    </TodoContextProvider>
  );
};

export default App;
