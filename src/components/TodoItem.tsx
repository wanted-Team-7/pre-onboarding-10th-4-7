import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { TodoItemTypes } from '../types/todo';
import TrashIcon from '../icon/TrashIcon';
import SpinnerIcon from '../icon/SpinnerIcon';
import { useTodoDispatch } from '../context/TodoProvider';

const TodoItem = ({ id, title }: TodoItemTypes) => {
  const [isLoading, setIsLoading] = useState(false);
  const { handleRemoveTodo } = useTodoDispatch();

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
          <button onClick={() => handleRemoveTodo(id, setIsLoading)}>
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
  display: flex;
  align-items: center;
  justify-content: space-between;
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
