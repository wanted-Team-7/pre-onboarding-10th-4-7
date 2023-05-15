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
    <Item>
      <span>{title}</span>
      <ItemOption>
        {!isLoading ? (
          <button onClick={() => handleRemoveTodo()}>
            <FaTrash className="btn-trash" />
          </button>
        ) : (
          <FaSpinner className="spinner" />
        )}
      </ItemOption>
    </Item>
  );
};

export default TodoItem;

const Item = styled.li`
  list-style-type: none;
  padding: 17px 1.5rem;
  border-bottom: 1px solid #eaeaea;
  font-size: 1.2rem;
  letter-spacing: 1.5px;
  &:hover {
    opacity: 0.85;
    background-color: #eaeaea;
  }
`;

const ItemOption = styled.div`
  float: right;
  button {
    background-color: transparent;
    border: none;
    cursor: pointer;
  }
`;
