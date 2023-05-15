import { useCallback, useState, useEffect } from 'react';
import { deleteTodo } from '../api/todo';
import { TodoTypes } from '../types/todo';
import { S } from './style';
import { ellipsis } from '../util/ellipsis';
import { LIMIT_STR_LENGTH } from '../util/constant';
interface TodoItemTypes {
  id: string;
  title: string;
  setTodos: React.Dispatch<React.SetStateAction<TodoTypes[]>>;
}

const TodoItem = ({ id, title, setTodos }: TodoItemTypes) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleRemoveTodo = useCallback(async () => {
    try {
      setIsLoading(true);
      await deleteTodo(id);

      setTodos(prev => prev.filter((item: TodoTypes) => item.id !== id));
    } catch (error) {
      console.error(error);
      alert('Something went wrong.');
    } finally {
      setIsLoading(false);
    }
  }, [id, setTodos]);

  useEffect(() => {
    return () => {
      setIsLoading(false);
    };
  }, []);

  return (
    <S.TodoElement>
      <span>{ellipsis(title, LIMIT_STR_LENGTH)}</span>
      <div>
        {!isLoading ? (
          <button onClick={() => handleRemoveTodo()}>
            <S.Trash />
          </button>
        ) : (
          <S.Spinner />
        )}
      </div>
    </S.TodoElement>
  );
};

export default TodoItem;
