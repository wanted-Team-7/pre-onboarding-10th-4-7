import styled from 'styled-components';
import { TodoTypes } from '../types/todo';
import TodoItem from './TodoItem';

interface TodoListTypes {
  todos: TodoTypes[];
  setTodos: React.Dispatch<React.SetStateAction<TodoTypes[]>>;
}

const TodoList = ({ todos, setTodos }: TodoListTypes) => {
  return todos.length ? (
    <ul>
      {todos.map(({ id, title }) => (
        <TodoItem key={id} id={id} title={title} setTodos={setTodos} />
      ))}
    </ul>
  ) : (
    <S.EmptyList>...</S.EmptyList>
  );
};

export default TodoList;

const S = {
  EmptyList: styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    font-size: 2.5rem;
    letter-spacing: 1.5rem;
    margin-left: 0.75rem;
    color: #ececec;
  `,
};
