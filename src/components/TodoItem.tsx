import { useCallback, useState, useEffect } from 'react';
import { deleteTodo } from '../api/todo';
import { TodoTypes } from '../types/todo';
import TrashIcon from '../views/Icon/TrashIcon';
import styled from 'styled-components';

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
    <Wrapper>
      <Title>{title}</Title>
      <TrashIcon isLoading={isLoading} handleRemoveTodo={handleRemoveTodo} />
    </Wrapper>
  );
};

const Wrapper = styled.li`
  position: relative;
  list-style-type: none;
  padding: 17px 1.5rem;
  border-bottom: 1px solid #eaeaea;
  letter-spacing: 1.5px;
  :hover {
    opacity: 0.85;
    background-color: #eaeaea;
  }
`;

const Title = styled.span`
  font-size: 18px;
  white-space: pre-wrap;
  word-break: break-all;
`;

export default TodoItem;
