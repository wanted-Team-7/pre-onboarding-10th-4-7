import GlobalStyle from './GlobalStyle';
import Main from './pages/Main';
import TodoContextProvider from './contexts/TodoContext';

const App = () => {
  return (
    <TodoContextProvider>
      <GlobalStyle />
      <Main />
    </TodoContextProvider>
  );
};

export default App;
