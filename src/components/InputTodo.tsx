import { ImSearch, ImSpinner8 } from 'react-icons/im';
import React, { useCallback, useEffect } from 'react';
import { TodoTypes } from '../types/todo';
import { createTodo, getSearchTodos } from '../api/todo';
import useFocus from '../hooks/useFocus';
import styled from 'styled-components';
import useDebounce from '../hooks/useDebounce';

const FIRST_PAGE = 1;

interface InputTodoType {
  inputText: string;
  setInputText: React.Dispatch<React.SetStateAction<string>>;
  setTodos: React.Dispatch<React.SetStateAction<TodoTypes[]>>;
  setSearchResults: React.Dispatch<React.SetStateAction<string[]>>;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  setIsHidden: React.Dispatch<React.SetStateAction<boolean>>;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setIsFocus: React.Dispatch<React.SetStateAction<boolean>>;
}

const InputTodo = ({
  inputText,
  setInputText,
  setTodos,
  setSearchResults,
  currentPage,
  setCurrentPage,
  setIsHidden,
  isLoading,
  setIsLoading,
  setIsFocus,
}: InputTodoType) => {
  const { ref, setFocus } = useFocus();
  const searchApiDebounce = useDebounce();

  useEffect(() => {
    setFocus();
  }, [setFocus]);

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

  const fetchSearchResults = useCallback(async (query: string) => {
    try {
      const data = query === '' ? { result: [] } : await getSearchTodos(query);
      setSearchResults(data.result);
      setCurrentPage(FIRST_PAGE);
    } catch (error) {
      console.error('Fetch error! ', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setInputText(value);
    setIsLoading(true);
    searchApiDebounce(() => fetchSearchResults(value));
  };

  // infinite query
  useEffect(() => {
    if (currentPage === 1) return;
    (async () => {
      try {
        setIsLoading(true);
        const data = await getSearchTodos(inputText, currentPage);
        setSearchResults(prevResult => [...prevResult, ...data.result]);
        if (Math.ceil(data.total / data.limit) === currentPage) {
          setIsHidden(true);
        }
      } catch (error) {
        console.error('Infinite fetch error! ', error);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [currentPage]);

  return (
    <TodoFormContainer
      onSubmit={handleSubmit}
      onClick={() => {
        setIsFocus(true);
      }}
    >
      <SearchIcon />
      <TodoInput
        placeholder="Add new todo..."
        ref={ref}
        value={inputText}
        onChange={handleInputChange}
      />
      {isLoading && <SpinIcon />}
    </TodoFormContainer>
  );
};

const TodoFormContainer = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 12px 13px;
  gap: 8px;

  width: 364px;
  height: 44px;

  /* Neutral (Light)/White */
  background: #ffffff;

  /* Neutral (Light)/300 */
  border: 1px solid #dedede;
  border-radius: 6px;

  &:hover {
    border: 3px solid #dedede;
  }
`;

const TodoInput = styled.input`
  width: 310px;
  height: 20px;

  /* English/Body 2/400 */

  font-family: 'Roboto';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  /* identical to box height, or 143% */

  display: flex;
  align-items: center;
  letter-spacing: 0.02em;

  /* Neutral (Dark)/Black */

  color: #000000;

  border: none;
  outline: none;
`;

const SearchIcon = styled(ImSearch)`
  width: 14px;
  height: 14px;
  color: #7d7d7d;
`;

const SpinIcon = styled(ImSpinner8)`
  font-size: 20px;
  animation: spin 2s linear infinite;
  display: flex;
  align-self: center;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

export default InputTodo;
