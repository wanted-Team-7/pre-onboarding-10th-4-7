import { ChangeEvent, useEffect, useState } from 'react';
// import { getTodoList } from '../api/todo';
import { TodoTypes } from '../types/todo';
import styled from 'styled-components';
import Header from '../components/Header';
import InputTodo from '../components/InputTodo';
import TodoList from '../components/TodoList';

const Main = () => {
  const [todoListData, setTodoListData] = useState<TodoTypes[]>([]);
  const [inputText, setInputText] = useState<string>('');

  const inputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value);
  };

  // useEffect(() => {
  //   (async () => {
  //     const { data } = await getTodoList();
  //     setTodoListData(data || []);
  //   })();
  // }, []);

  return (
    // <div className="container">
    //   <div className="inner">
    //     <Header />
    //     <InputTodo inputText={inputText} inputChange={inputChange} setTodos={setTodoListData} />
    //     {/* <TodoList todos={todoListData} setTodos={setTodoListData} /> */}
    //   </div>
    // </div>
    <Container>
      <Inner>
        <Header />
        <InputTodo inputText={inputText} inputChange={inputChange} setTodos={setTodoListData} />
        {/* <TodoList todos={todoListData} setTodos={setTodoListData} /> */}
      </Inner>
    </Container>
  );
};

export default Main;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  max-width: 600px;
  margin: 0 auto;
`;

const Inner = styled.div`
  width: 100%;
  padding: 8rem 10px 4rem;
`;
