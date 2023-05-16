import styled from 'styled-components';
import { TodoTypes } from '../types/todo';
import TodoItem from '../components/TodoItem';

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
    <Empty>...</Empty>
  );
};

const Empty = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;

  margin-left: 0.75rem;

  font-size: 2.5rem;
  letter-spacing: 1.5rem;
  color: #ececec;
`;

export default TodoList;
