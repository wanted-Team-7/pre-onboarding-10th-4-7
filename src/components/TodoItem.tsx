import { FaSpinner, FaTrash } from 'react-icons/fa';
import { useCallback, useState, useEffect } from 'react';
import { deleteTodo } from '../api/todo';
import { TodoTypes } from '../types/todo';
import styled from 'styled-components';

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
    <TodoItemContainer>
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
    </TodoItemContainer>
  );
};

const TodoItemContainer = styled.li`
  /* list-style-type: none;
  padding: 17px 1.5rem;
  border-bottom: 1px solid #eaeaea;
  font-size: 1.2rem;
  letter-spacing: 1.5px; */
  /* DropDown/ Item */

  /* Auto layout */

  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 6px 12px;
  gap: 10px;

  width: 354px;
  height: 28px;

  /* Neutral/White */

  background: #ffffff;
  border-radius: 3px;

  /* Inside auto layout */

  flex: none;
  order: 0;
  align-self: stretch;
  flex-grow: 0;
`;

export default TodoItem;
