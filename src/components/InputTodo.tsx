import { FaPlusCircle } from 'react-icons/fa';
import { useCallback, useEffect, useState } from 'react';
import { TodoTypes } from '../types/todo';
import { createTodo } from '../api/todo';
import useFocus from '../hooks/useFocus';
import styled from 'styled-components';
import Spinner from './common/Spinner';
import useDebounce from './../hooks/useDebounce';
import RecommendList from './RecommendList';

interface InputTodoType {
  setTodos: React.Dispatch<React.SetStateAction<TodoTypes[]>>;
  isElementfocus: boolean;
  setIsElementfocus: (isfocus: boolean) => void;
}

const InputTodo = ({ setTodos, isElementfocus, setIsElementfocus }: InputTodoType) => {
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isVisibleRecommendList, setIsVisibleRecommendList] = useState(false);

  const { ref, setFocus } = useFocus();

  useEffect(() => {
    setFocus();
  }, [setFocus]);

  useEffect(() => {
    if (inputText === '') {
      setIsVisibleRecommendList(false);
    }
  }, [inputText]);

  const searchTerm = useDebounce(inputText, 500);

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
    <>
      <S.FormContainer
        focus={isElementfocus}
        onSubmit={handleSubmit}
        onClick={() => setIsElementfocus(true)}
      >
        <svg
          width="17"
          height="17"
          viewBox="0 0 17 17"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M13 7.5C13 10.5376 10.5376 13 7.5 13C4.46243 13 2 10.5376 2 7.5C2 4.46243 4.46243 2 7.5 2C10.5376 2 13 4.46243 13 7.5ZM12.0491 13.4633C10.7873 14.4274 9.21054 15 7.5 15C3.35786 15 0 11.6421 0 7.5C0 3.35786 3.35786 0 7.5 0C11.6421 0 15 3.35786 15 7.5C15 9.21054 14.4274 10.7873 13.4633 12.0491L16.6569 15.2426C17.0474 15.6332 17.0474 16.2663 16.6569 16.6569C16.2663 17.0474 15.6332 17.0474 15.2426 16.6569L12.0491 13.4633Z"
            fill="black"
          />
        </svg>
        <S.InputText
          placeholder="Add new todo..."
          ref={ref}
          value={inputText}
          onChange={e => {
            setInputText(e.target.value);
          }}
          onKeyDown={event => {
            if (event.key === 'Escape') {
              setIsVisibleRecommendList(false);
            }
          }}
          disabled={isLoading}
        />
        {isLoading && <Spinner />}
      </S.FormContainer>
      <RecommendList
        searchTerm={searchTerm}
        addTodo={addTodo}
        setInputText={setInputText}
        isVisibleRecommendList={isVisibleRecommendList}
        setIsVisibleRecommendList={setIsVisibleRecommendList}
      />
    </>
  );
};

export default InputTodo;

const S = {
  FormContainer: styled.form<{ focus: boolean }>`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 12px 13px;
    gap: 8px;
    width: 100%;
    height: 44px;
    background: #ffffff;
    border: 1px solid ${({ focus }) => (focus ? '#9F9F9F' : '#dedede')};
    border-radius: 6px;
    svg {
      width: 15px;
      height: 15px;
    }
    :hover {
      border: 3px solid #dedede;
    }
  `,
  InputText: styled.input`
    height: 20px;
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 20px;
    display: flex;
    align-items: center;
    letter-spacing: 0.02em;
    color: #000000;
    flex: none;
    flex-grow: 1;
    outline: none;
    border: none;
    padding-right: 5px;
    padding-left: 10px;
    border-radius: calc(0.5 * 100px);
    background-color: transparent;
    ::placeholder {
      color: #9f9f9f;
    }
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
