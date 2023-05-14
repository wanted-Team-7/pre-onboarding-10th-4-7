import { TodoTypes } from "../types/todo";
import TodoItem from "./TodoItem";

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
    <div className="empty-list">...</div>
  );
};
export default TodoList;
