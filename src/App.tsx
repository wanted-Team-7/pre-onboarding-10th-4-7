import React from 'react';
import Main from './pages/Main';
import { GlobalStyle } from './GlobalStyle';

const App = () => {
  return (
    <React.Fragment>
      <GlobalStyle />
      <Main />
    </React.Fragment>
  );
};

export default App;
