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
  width: 100%;
  display: flex;
  justify-content: center;
  font-size: 2.5rem;
  letter-spacing: 1.5rem;
  margin-left: 0.75rem;
  color: #ececec;
`;

export default TodoList;
