import { FaTrash } from 'react-icons/fa';
import { useCallback, useState, useEffect } from 'react';
import { deleteTodo } from '../api/todo';
import { TodoTypes } from '../types/todo';
import styled from 'styled-components';
import Spinner from './common/Spinner';

interface TodoItemTypes {
  id: string;
  title: string;
  setTodos: React.Dispatch<React.SetStateAction<TodoTypes[]>>;
}

const TodoItem = ({ id, title, setTodos }: TodoItemTypes) => {
  const [isRemoveLoading, setIsRemoveLoading] = useState(false);

  const removeTodo = async () => {
    await deleteTodo(id);
    setTodos(prev => prev.filter((item: TodoTypes) => item.id !== id));
  };

  const handleRemoveTodo = useCallback(async () => {
    setIsRemoveLoading(true);
    await removeTodo();
    setIsRemoveLoading(false);
  }, [id, setTodos]);

  useEffect(() => {
    return () => {
      setIsRemoveLoading(false);
    };
  }, []);

  return (
    <S.Item>
      <span>{title}</span>
      <S.ItemOption>
        {!isRemoveLoading ? (
          <button onClick={() => handleRemoveTodo()}>
            <FaTrash className="btn-trash" />
          </button>
        ) : (
          <Spinner />
        )}
      </S.ItemOption>
    </S.Item>
  );
};

export default TodoItem;

const S = {
  Item: styled.li`
    list-style-type: none;
    padding: 17px 1.5rem;
    border-bottom: 1px solid #eaeaea;
    font-size: 1.2rem;
    letter-spacing: 1.5px;
    :hover {
      opacity: 0.85;
      background-color: #eaeaea;
    }
  `,
  ItemOption: styled.div`
    float: right;
    button {
      background-color: transparent;
      border: none;
      cursor: pointer;
      color: orangered;
      font-size: 16px;
      :hover {
        opacity: 0.5;
      }
    }
  `,
};
