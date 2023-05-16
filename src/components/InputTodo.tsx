import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { FiSearch } from 'react-icons/fi';
import { useCallback, useEffect, useState, useRef } from 'react';
import { TodoTypes } from '../types/todo';
import { createTodo } from '../api/todo';
import useFocus from '../hooks/useFocus';
import useDebounce from '../hooks/useDebounce';
import styled from 'styled-components';
import Dropdown from './Dropdown';
import { getSearchList } from '../api/todo';

interface InputTodoType {
  setTodos: React.Dispatch<React.SetStateAction<TodoTypes[]>>;
}

const InputTodo = ({ setTodos }: InputTodoType) => {
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<string[]>([]);
  const [page, setPage] = useState(1);
  const [isScrollDataLoading, setIsScrollDataLoading] = useState(false);
  const { ref, setFocus } = useFocus();
  const dropdownRef = useRef<HTMLDivElement>(null);

  const debouncedInputText = useDebounce(inputText, 500);

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
    [debouncedInputText, setTodos]
  );

  const handleFocus = () => {
    if (dropdownRef.current) {
      dropdownRef.current.style.display = 'block';
    }
  };

  const handleBlur = () => {
    if (dropdownRef.current) {
      dropdownRef.current.style.display = 'none';
    }
  };

  const getTypingData = async () => {
    try {
      const res = await getSearchList(debouncedInputText, page);
      const serverData = res.data.result;
      setData(serverData);
    } catch (error) {
      return console.log(error);
    }
  };

  const getScrollData = async () => {
    try {
      if (data.length === 0) return;
      setIsScrollDataLoading(true);
      setPage(pre => pre + 1);
      const res = await getSearchList(debouncedInputText, page);
      const scrollServerData = res.data.result;
      setData([...data, ...scrollServerData]);
      setIsScrollDataLoading(false);
    } catch (error) {
      return console.log(error);
    }
  };

  useEffect(() => {
    getTypingData();
  }, [debouncedInputText]);

  return (
    <>
      <StFormContainer>
        <StForm onSubmit={handleSubmit}>
          <StSearchIconWrapper>
            <FiSearch />
          </StSearchIconWrapper>
          <StInput
            className="input-text"
            placeholder="Placeholder"
            ref={ref}
            value={inputText}
            onChange={e => setInputText(e.target.value)}
            disabled={isLoading}
            onFocus={handleFocus}
            onBlur={handleBlur}
          />

          {isLoading && (
            <StSpinnerContainer>
              <AiOutlineLoading3Quarters className="spinner" />
            </StSpinnerContainer>
          )}
        </StForm>
      </StFormContainer>
      <Dropdown
        ref={dropdownRef}
        data={data}
        debouncedInputText={debouncedInputText}
        getScrollData={getScrollData}
        isScrollDataLoading={isScrollDataLoading}
      />
    </>
  );
};

const StFormContainer = styled.div`
  height: 67px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StForm = styled.form`
  width: 364px;
  display: flex;
  border: 1px solid #dedede;
  border-radius: 6px;
  transition: border 0.3s;
  position: relative;

  &:hover {
    border-width: 3px;
  }
  &:focus-within {
    border: 1px solid #9f9f9f;
  }
  padding-left: 15px;
  padding-right: 16px;
`;

const StInput = styled.input`
  width: 100%;
  text-overflow: ellipsis;

  &::placeholder {
    color: #9f9f9f;
  }
`;

const StSearchIconWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-right: 12px;
  color: #7d7d7d;
`;

const StSpinnerContainer = styled.div`
  display: flex;
  align-items: center;
  padding-left: 8px;
  .spinner {
    color: #4b4b4b;
    animation: spin 1s infinite linear;
  }
`;

export default InputTodo;
