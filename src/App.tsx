import React from 'react';
import TodoContextProvider from './contexts/TodoContext';
import GlobalStyle from './GlobalStyle';
import Main from './pages/Main';

const App = () => {
  return (
    <TodoContextProvider>
      <GlobalStyle />
      <Main />
    </TodoContextProvider>
  );
};

export default App;
