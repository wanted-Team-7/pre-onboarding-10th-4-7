import { FaSpinner } from 'react-icons/fa';
import { useCallback, useEffect, useState } from 'react';
import { TodoTypes } from '../types/todo';
import { createTodo } from '../api/todo';
import { getSearchList } from '../api/todo';
import { useDebounce } from '../hooks/useDebounce';
import { LIMIT } from '../constant';
import { S } from './style';

interface InputTodoType {
  setTodos: React.Dispatch<React.SetStateAction<TodoTypes[]>>;
  setSearchList: React.Dispatch<React.SetStateAction<string[]>>;
  searchList: string[] | undefined;
  currentPage: number;
  inputText: string;

  setInputText: React.Dispatch<React.SetStateAction<string>>;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  setDropdownDisplay: React.Dispatch<React.SetStateAction<boolean>>;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  isLoading: boolean;
}

const InputTodo = ({
  setTodos,
  setSearchList,
  searchList,
  currentPage,
  inputText,
  setInputText,
  setCurrentPage,
  setDropdownDisplay,
  isLoading,
  setIsLoading,
}: InputTodoType) => {
  const debounceValue = useDebounce(inputText, 500);

  useEffect(() => {
    if (debounceValue.length !== 0) setDropdownDisplay(true);
    else setDropdownDisplay(false);

    if (currentPage !== 1) {
      console.log('new Search');
      setSearchList([]);
      setCurrentPage(1);
    } else {
      (async () => {
        const result = await getSearchList(debounceValue, currentPage, LIMIT);
        setSearchList(result.result);
      })();
    }
  }, [debounceValue]);

  const onChangeInputValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value);
  };

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
    [inputText, setTodos]
  );

  return (
    <S.InputForm onSubmit={handleSubmit}>
      <S.Input
        placeholder="Add new todo..."
        value={inputText}
        onChange={onChangeInputValue}
        disabled={isLoading}
      />
      {isLoading ? <S.Spinner /> : null}
    </S.InputForm>
  );
};

export default InputTodo;
