import { useEffect, useState } from 'react';
import { getTodoList } from '../api/todo';
import { TodoTypes } from '../types/todo';
import Header from '../components/Header';
import InputTodo from '../components/InputTodo';
import TodoList from '../components/TodoList';
import styled from 'styled-components';

const Main = () => {
  const [todoListData, setTodoListData] = useState<TodoTypes[]>([]);
  const [isElementfocus, setIsElementfocus] = useState(false);

  useEffect(() => {
    (async () => {
      const { data } = await getTodoList();
      setTodoListData(data || []);
    })();
  }, []);

  return (
    <S.Container>
      <S.Inner>
        <Header />
        <InputTodo
          setTodos={setTodoListData}
          isElementfocus={isElementfocus}
          setIsElementfocus={setIsElementfocus}
        />
        <TodoList todos={todoListData} setTodos={setTodoListData} />
      </S.Inner>
    </S.Container>
  );
};

export default Main;

const S = {
  Container: styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    max-width: 600px;
    margin: 0 auto;
  `,
  Inner: styled.div`
    width: 100%;
    padding: 8rem 10px 4rem;
  `,
};
