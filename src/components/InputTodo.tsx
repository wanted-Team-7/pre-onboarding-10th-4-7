import { FaPlusCircle, FaSpinner, FaSearch } from 'react-icons/fa';
import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { TodoTypes } from '../types/todo';
import { createTodo } from '../api/todo';
import useFocus from '../hooks/useFocus';
import useDebounce from '../hooks/useDebounce';
import styled from 'styled-components';
import RecomendedList from './RecommendedList';

interface InputTodoType {
  setTodos: React.Dispatch<React.SetStateAction<TodoTypes[]>>;
  inputText: string;
  inputChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const InputTodo = ({ setTodos, inputText, inputChange }: InputTodoType) => {
  const [isLoading, setIsLoading] = useState(false);
  const { ref, setFocus } = useFocus();
  const [showRecomendedList, setShowRecomendedList] = useState<boolean>(false);

  useEffect(() => {
    setFocus();
  }, [setFocus]);

  useEffect(() => {
    if (inputText.trim() === '') {
      setShowRecomendedList(false);
    }
  }, [inputText]);

  const searchText = useDebounce(inputText, 500);

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
        // inputChange('')
        setIsLoading(false);
      }
    },
    [inputText, setTodos]
  );

  return (
    <>
      <FormContainer onSubmit={handleSubmit}>
        <SearchIcon>
          <FaSearch />
        </SearchIcon>
        <InputText
          placeholder="Add new todo..."
          ref={ref}
          value={inputText}
          onChange={inputChange}
          disabled={isLoading}
        />
        {/* {!isLoading ? (
        <InputSubmit type="submit">
          <FaPlusCircle className="btn-plus" />
        </InputSubmit>
      ) : (
        <FaSpinner className="spinner" />
      )} */}
      </FormContainer>
      <RecomendedList searchText={searchText} />
    </>
  );
};

export default InputTodo;

const FormContainer = styled.form`
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 12px 13px;
  gap: 8px;
  position: absolute;
  width: 364px;
  height: 44px;
  left: 587px;
  top: 351px;
  background: #ffffff;
  border: 1px solid #9f9f9f;
  border-radius: 6px;
`;

const InputText = styled.input`
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
  order: 1;
  flex-grow: 1;
  border: none;
  outline: none;
`;

const SearchIcon = styled.div`
  width: 20px;
  height: 20px;
  flex: none;
  order: 0;
  flex-grow: 0;
`;

// const FormContainer = styled.form`
//   width: 100%;
//   margin-bottom: 20px;
//   display: flex;
//   border-radius: calc(0.5 * 100px);
//   box-shadow: 0 1px 6px 0 rgba(0, 0, 0, 0.38);
//   justify-content: space-evenly;
// `;

// const InputText = styled.input`
//   font-size: 1rem;
//   font-weight: 400;
//   width: 85%;
//   padding-right: 5px;
//   padding-left: 10px;
//   border-radius: calc(0.5 * 100px);
//   background-color: transparent;
//   height: 45px;
//   outline: none;
//   border: none;
// `;

const InputSubmit = styled.button`
  background: transparent;
  cursor: pointer;
  display: flex;
  align-items: center;
  height: 45px;
  outline: none;
  border: none;
`;
