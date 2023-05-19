import { useCallback, useState, useEffect } from 'react';
import { TodoTypes, deleteTodo } from '../api/todo';
import TrashIcon from './Icon/TrashIcon';
import styled from 'styled-components';
import { useTodoDispatch } from '../contexts/TodoContext';

interface TodoItemTypes {
  id: string;
  title: string;
}

const TodoItem = ({ id, title }: TodoItemTypes) => {
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const { setTodoListData } = useTodoDispatch();

  const handleRemoveTodo = useCallback(async () => {
    setIsDeleting(true);
    await deleteTodo(id);
    setTodoListData(prev => prev.filter((item: TodoTypes) => item.id !== id));
    setIsDeleting(false);
  }, [id]);

  useEffect(() => {
    return () => {
      setIsDeleting(false);
    };
  }, []);

  return (
    <Wrapper>
      <Title>{title}</Title>
      <TrashIcon isDeleting={isDeleting} handleRemoveTodo={handleRemoveTodo} />
    </Wrapper>
  );
};

const Wrapper = styled.li`
  position: relative;
  list-style-type: none;
  padding: 17px 1.5rem;
  border-bottom: 1px solid ${({ theme }) => theme.line};

  letter-spacing: 1.5px;

  :hover {
    opacity: 0.85;

    background-color: ${({ theme }) => theme.line};
  }
`;

const Title = styled.span`
  font-size: 18px;
  white-space: pre-wrap;
  word-break: break-all;
`;

export default TodoItem;
