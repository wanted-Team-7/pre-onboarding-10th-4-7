import { useEffect, useState } from 'react';
import { getTodoList } from '../api/todo';
import { TodoTypes } from '../types/todo';
import Header from '../components/Header';
import InputTodo from '../components/InputTodo';
import TodoList from '../components/TodoList';
import styled from 'styled-components';
import TodoDropDown from '../components/TodoDropDown';

const Main = () => {
  const [todoListData, setTodoListData] = useState<TodoTypes[]>([]);
  const [searchResults, setSearchResults] = useState<string[]>([]);

  useEffect(() => {
    (async () => {
      const { data } = await getTodoList();
      console.log('get Todo list: ', data);
      setTodoListData(data || []);
    })();
  }, []);

  return (
    <TodoContainer>
      <TodoInner>
        <Header />
        <InputTodo setTodos={setTodoListData} setSearchResults={setSearchResults} />
        <TodoDropDown searchResults={searchResults} />
        <TodoList todos={todoListData} setTodos={setTodoListData} />
      </TodoInner>
    </TodoContainer>
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
