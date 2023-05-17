import styled from 'styled-components';
import TodoItem from '../components/TodoItem';
import { TodoTypes } from '../api/todo';

interface TodoListTypes {
  todos: TodoTypes[];
}

const TodoList = ({ todos }: TodoListTypes) => {
  return todos.length ? (
    <ul>
      {todos.map(({ id, title }) => (
        <TodoItem key={id} id={id} title={title} />
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
