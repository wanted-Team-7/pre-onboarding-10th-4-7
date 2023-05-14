import { FaSpinner, FaTrash } from 'react-icons/fa';
import { useCallback, useState, useEffect } from 'react';
import { deleteTodo } from '../api/todo';
import { TodoTypes } from '../types/todo';

interface TodoItemTypes {
  id: string;
  title: string;
  setTodos: React.Dispatch<React.SetStateAction<TodoTypes[]>>;
}

const TodoItem = ({ id, title, setTodos }: TodoItemTypes) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleRemoveTodo = useCallback(async () => {
    setIsLoading(true);
    await deleteTodo(id);
    setTodos(prev => prev.filter((item: TodoTypes) => item.id !== id));
    setIsLoading(false);
  }, [id, setTodos]);

  useEffect(() => {
    return () => {
      setIsLoading(false);
    };
  }, []);

  return (
    <li className="item">
      <span>{title}</span>
      <div className="item-option">
        {!isLoading ? (
          <button onClick={() => handleRemoveTodo()}>
            <FaTrash className="btn-trash" />
          </button>
        ) : (
          <FaSpinner className="spinner" />
        )}
      </div>
    </li>
  );
};

export default TodoItem;
