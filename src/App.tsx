import GlobalStyle from './GlobalStyle';
import React from 'react';
import Main from './pages/Main';

const App = () => {
  return (
    <React.Fragment>
      <GlobalStyle />
      <Main />
    </React.Fragment>
  );
};

export default App;
