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
    <EmptyList2>...</EmptyList2>
  );
};

const EmptyList = styled.div`
  /* width: 100%;
  display: flex;
  justify-content: center;
  font-size: 2.5rem;
  letter-spacing: 1.5rem;
  margin-left: 0.75rem;
  color: #ececec; */

  position: absolute;
  left: 20.83%;
  right: 20.83%;
  top: 43.75%;
  bottom: 43.75%;

  /* Neutral (Dark)/600 */

  background: #9f9f9f;
`;

const EmptyList2 = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  font-size: 2.5rem;
  letter-spacing: 1.5rem;
  margin-left: 0.75rem;
  color: #ececec;
`;

export default TodoList;
