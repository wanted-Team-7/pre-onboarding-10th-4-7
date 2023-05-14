import { FaPlusCircle } from 'react-icons/fa';
import { useCallback, useEffect, useState } from 'react';
import { TodoTypes } from '../types/todo';
import { createTodo } from '../api/todo';
import useFocus from '../hooks/useFocus';
import styled from 'styled-components';
import Spinner from './common/Spinner';

interface InputTodoType {
  setTodos: React.Dispatch<React.SetStateAction<TodoTypes[]>>;
}

const InputTodo = ({ setTodos }: InputTodoType) => {
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { ref, setFocus } = useFocus();

  useEffect(() => {
    setFocus();
  }, [setFocus]);

  const trimInputText = (inputText: string) => {
    const trimmedText = inputText.trim();

    if (!trimmedText) {
      return alert('Please write something');
    } else return trimmedText;
  };

  const addTodo = async (todo: string) => {
    const newItem = { title: todo };
    const { data } = await createTodo(newItem);

    if (data) {
      return setTodos(prev => [...prev, data]);
    }
  };

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setIsLoading(true);

      const trimmedText = trimInputText(inputText);

      if (trimmedText) {
        await addTodo(trimmedText);
      }

      setInputText('');
      setIsLoading(false);
    },
    [inputText, setTodos]
  );

  return (
    <S.FormContainer onSubmit={handleSubmit}>
      <S.InputText
        placeholder="Add new todo..."
        ref={ref}
        value={inputText}
        onChange={e => setInputText(e.target.value)}
        disabled={isLoading}
      />
      {!isLoading ? (
        <S.InputSubmit type="submit">
          <FaPlusCircle />
        </S.InputSubmit>
      ) : (
        <Spinner />
      )}
    </S.FormContainer>
  );
};

export default InputTodo;

const S = {
  FormContainer: styled.form`
    width: 100%;
    margin-bottom: 20px;
    display: flex;
    border-radius: calc(0.5 * 100px);
    box-shadow: 0 1px 6px 0 rgba(0, 0, 0, 0.38);
    justify-content: space-evenly;
  `,
  InputText: styled.input`
    font-size: 1rem;
    font-weight: 400;
    width: 85%;
    height: 45px;
    outline: none;
    border: none;
    padding-right: 5px;
    padding-left: 10px;
    border-radius: calc(0.5 * 100px);
    background-color: transparent;
  `,
  InputSubmit: styled.button`
    background: transparent;
    cursor: pointer;
    display: flex;
    align-items: center;
    height: 45px;
    outline: none;
    border: none;
    color: darkcyan;
    font-size: 20px;
    :hover {
      opacity: 0.5;
    }
  `,
};
