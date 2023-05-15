import { TodoTypes } from '../types/todo';
import { S } from './style';
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
    <S.Empty className="empty-list">...</S.Empty>
  );
};

export default TodoList;
