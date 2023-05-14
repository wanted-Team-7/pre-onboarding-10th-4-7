import { FaPlusCircle, FaSpinner } from 'react-icons/fa';
import { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import { TodoTypes } from '../types/todo';
import { createTodo } from '../api/todo';
import useDebounce from '../hooks/useDebounce';

interface InputTodoType {
  setTodos: React.Dispatch<React.SetStateAction<TodoTypes[]>>;
  inputRef: React.RefObject<HTMLInputElement>;
  setInputFocus: () => void;
  handleInputClick: () => void;
  inputText: string;
  setInputText: React.Dispatch<React.SetStateAction<string>>;
  handleSearchFetch: (type: string) => void;
}

const InputTodo = ({
  setTodos,
  inputRef,
  setInputFocus,
  handleInputClick,
  inputText,
  setInputText,
  handleSearchFetch,
}: InputTodoType) => {
  const [isLoading, setIsLoading] = useState(false);
  const debouncedSearch = useDebounce(inputText, 500);

  useEffect(() => {
    handleSearchFetch('first');
  }, [debouncedSearch]);

  useEffect(() => {
    setInputFocus();
  }, [setInputFocus]);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      try {
        e.preventDefault();
        setIsLoading(true);

        const trimmed = inputText.trim();
        if (!trimmed) {
          return alert('Please write something');
        }

        const newItem = { title: trimmed };
        const { data } = await createTodo(newItem);

        if (data) {
          return setTodos(prev => [...prev, data]);
        }
      } catch (error) {
        console.error(error);
        alert('Something went wrong.');
      } finally {
        setInputText('');
        setIsLoading(false);
      }
    },
    [inputText, setInputText, setTodos]
  );

  return (
    <FormContainer onSubmit={handleSubmit}>
      <InputText
        placeholder="Add new todo..."
        ref={inputRef}
        value={inputText}
        onChange={e => setInputText(e.target.value)}
        onClick={handleInputClick}
        disabled={isLoading}
      />
      {!isLoading ? (
        <InputSubmit type="submit">
          <FaPlusCircle className="btn-plus" />
        </InputSubmit>
      ) : (
        <FaSpinner className="spinner" />
      )}
    </FormContainer>
  );
};

export default InputTodo;

const FormContainer = styled.form`
  width: 100%;
  margin-bottom: 20px;
  display: flex;
  border-radius: 6px;
  border: 1px solid #dedede;
  justify-content: space-evenly;
  &:hover {
    border: 3px solid #dedede;
    margin-top: -2px;
    margin-bottom: 18px;
  }
`;

const InputText = styled.input`
  font-size: 1rem;
  font-weight: 400;
  width: 85%;
  padding-right: 5px;
  padding-left: 10px;
  height: 45px;
  outline: none;
  border: none;
  background-color: transparent;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const InputSubmit = styled.button`
  background: transparent;
  cursor: pointer;
  display: flex;
  align-items: center;
  height: 45px;
  outline: none;
  border: none;
`;
