import { FaPlusCircle, FaSpinner, FaSistrix } from 'react-icons/fa';
import { useCallback, useEffect, useState } from 'react';
import { TodoTypes } from '../types/todo';
import { createTodo } from '../api/todo';
import useFocus from '../hooks/useFocus';
import { SearchIcon } from './InputTodo.styled';

interface InputTodoType {
  inputText: string;
  setTodos: React.Dispatch<React.SetStateAction<TodoTypes[]>>;
  setInputText: React.Dispatch<React.SetStateAction<string>>;
  getSearchKeywordHandler: (input: string) => Promise<void>;
  keydownHandler: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

const InputTodo = ({
  setTodos,
  inputText,
  setInputText,
  getSearchKeywordHandler,
  keydownHandler,
}: InputTodoType) => {
  const [isLoading, setIsLoading] = useState(false);
  const { ref, setFocus } = useFocus();

  useEffect(() => {
    setFocus();
  }, [setFocus]);

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      getSearchKeywordHandler(inputText);
    }, 500);

    return () => clearTimeout(debounceTimer);
  }, [inputText]);

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
    <form className="form-container" onSubmit={handleSubmit}>
      <SearchIcon>
        <FaSistrix />
      </SearchIcon>
      <input
        className="input-text"
        placeholder="Add new todo..."
        ref={ref}
        value={inputText}
        onChange={e => setInputText(e.target.value)}
        onKeyDown={keydownHandler}
        disabled={isLoading}
      />
      {!isLoading ? (
        <button className="input-submit" type="submit">
          <FaPlusCircle className="btn-plus" />
        </button>
      ) : (
        <FaSpinner className="spinner" />
      )}
    </form>
  );
};

export default InputTodo;
