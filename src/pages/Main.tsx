import { createContext, useEffect, useState } from 'react';
import { getTodoList } from '../api/todo';
import { TodoTypes } from '../types/todo';
import Header from '../components/Header';
import InputTodo from '../components/InputTodo';
import TodoList from '../components/TodoList';
import styled from 'styled-components';
import TodoDropDown from '../components/TodoDropDown';

interface ITodoDispatchContext {
  setTodoListData: React.Dispatch<React.SetStateAction<TodoTypes[]>>;
  setInputText: React.Dispatch<React.SetStateAction<string>>;
}
export const TodoDispatchContext = createContext<ITodoDispatchContext | undefined>(undefined);

const Main = () => {
  const [inputText, setInputText] = useState('');
  const [todoListData, setTodoListData] = useState<TodoTypes[]>([]);
  const [searchResults, setSearchResults] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isHidden, setIsHidden] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isFocus, setIsFocus] = useState(false);

  useEffect(() => {
    (async () => {
      const { data } = await getTodoList();
      console.log('get Todo list: ', data);
      setTodoListData(data || []);
    })();
  }, []);

  return (
    <TodoDispatchContext.Provider value={{ setTodoListData, setInputText }}>
      <TodoContainer>
        <TodoInner>
          <Header />
          <InputTodo
            inputText={inputText}
            setInputText={setInputText}
            setTodos={setTodoListData}
            setSearchResults={setSearchResults}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            setIsHidden={setIsHidden}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
            setIsFocus={setIsFocus}
          />
          {/* {searchResults.length !== 0 && (
          <TodoDropDown
            searchResults={searchResults}
            setCurrentPage={setCurrentPage}
            isHidden={isHidden}
            isLoading={isLoading}
          />
        )} */}
          {isFocus && (
            <TodoDropDown
              searchResults={searchResults}
              setCurrentPage={setCurrentPage}
              isHidden={isHidden}
              isLoading={isLoading}
            />
          )}

          <TodoList todos={todoListData} setTodos={setTodoListData} />
        </TodoInner>
      </TodoContainer>
    </TodoDispatchContext.Provider>
  );
};

const TodoContainer = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  max-width: 600px;
  margin: 0 auto;
`;
const TodoInner = styled.div`
  width: 100%;
  padding: 8rem 10px 4rem;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export default Main;
