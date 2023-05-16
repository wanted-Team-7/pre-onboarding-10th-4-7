import './App.css';
import TodoContextProvider from './contexts/TodoContext';
import Main from './pages/Main';

const App = () => {
  return (
    <TodoContextProvider>
      <Main />
    </TodoContextProvider>
  );
};

export default App;
