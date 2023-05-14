import { useEffect, useState } from 'react';
import { getTodoList } from '../api/todo';
import { TodoTypes } from '../types/todo';
import Header from '../components/Header';
import InputTodo from '../components/InputTodo';
import TodoList from '../components/TodoList';
import styled from 'styled-components';

const Main = () => {
  const [todoListData, setTodoListData] = useState<TodoTypes[]>([]);

  // useEffect(() => {
  //   (async () => {
  //     const { data } = await getTodoList();
  //     setTodoListData(data || []);
  //   })();
  // }, []);

  return (
    <TodoContainer>
      <TodoInner>
        <Header />
        <InputTodo setTodos={setTodoListData} />
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
