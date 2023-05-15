import { useCallback, useState, useEffect } from 'react';
import styled from 'styled-components';
import { deleteTodo } from '../api/todo';
import { TodoTypes } from '../types/todo';
import TrashIcon from '../icon/TrashIcon';
import SpinnerIcon from '../icon/SpinnerIcon';

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
            <TrashIcon />
          </button>
        ) : (
          <SpinnerIcon />
        )}
      </ItemOption>
    </Item>
  );
};

export default TodoItem;

const Item = styled.li`
  list-style-type: none;
  padding: 17px 1.5rem;
  border-bottom: 1px solid ${({ theme }) => theme.color.COLOR_GRAY_2};
  font-size: 1.2rem;
  letter-spacing: 1.5px;
  &:hover {
    opacity: 0.85;
    background-color: ${({ theme }) => theme.color.COLOR_GRAY_2};
  }
`;

const ItemOption = styled.div`
  float: right;
  button {
    background-color: ${({ theme }) => theme.color.COLOR_NONE};
    border: none;
    cursor: pointer;
  }
`;
