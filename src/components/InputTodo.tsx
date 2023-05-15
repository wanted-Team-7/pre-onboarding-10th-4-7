import { FaPlusCircle, FaSpinner } from 'react-icons/fa';
import { useCallback, useEffect, useState } from 'react';
import { TodoTypes } from '../types/todo';
import { createTodo } from '../api/todo';
import useFocus from '../hooks/useFocus';
import { getSearchList } from '../api/todo';
import { useDebounce } from '../hooks/useDebounce';
import { LIMIT } from '../constant';

interface InputTodoType {
  setTodos: React.Dispatch<React.SetStateAction<TodoTypes[]>>;
  setSearchList: React.Dispatch<React.SetStateAction<string[]>>;
  searchList: string[] | undefined;
  currentPage: number;
  inputText: string;
  setInputText: React.Dispatch<React.SetStateAction<string>>;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}

const InputTodo = ({
  setTodos,
  setSearchList,
  searchList,
  currentPage,
  inputText,
  setInputText,
  setCurrentPage,
}: InputTodoType) => {
  const [isLoading, setIsLoading] = useState(false);
  const debounceValue = useDebounce(inputText, 500);
  const { ref, setFocus } = useFocus();

  useEffect(() => {
    setFocus();
  }, [setFocus]);

  useEffect(() => {
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
    <form className="form-container" onSubmit={handleSubmit}>
      <input
        className="input-text"
        placeholder="Add new todo..."
        ref={ref}
        value={inputText}
        onChange={onChangeInputValue}
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
