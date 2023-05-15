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
  // isDeleting: 할 일 삭제 중 여부
  const [isDeleting, setIsDeleting] = useState<boolean>(false);

  // handleRemoveTodo: 할 일 삭제 처리 함수
  const handleRemoveTodo = useCallback(async () => {
    setIsDeleting(true);
    await deleteTodo(id);
    setTodos(prev => prev.filter((item: TodoTypes) => item.id !== id));
    setIsDeleting(false);
  }, [id, setTodos]);

  useEffect(() => {
    // 컴포넌트 언마운트 시 isDeleting 상태 초기화
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
