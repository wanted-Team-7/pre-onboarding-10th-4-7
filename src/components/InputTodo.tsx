import { FaPlusCircle, FaSpinner } from 'react-icons/fa';
import { useCallback, useEffect, useState } from 'react';
import { TodoTypes } from '../types/todo';
import { createTodo } from '../api/todo';
import useFocus from '../hooks/useFocus';

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
    <form className="form-container" onSubmit={handleSubmit}>
      <input
        className="input-text"
        placeholder="Add new todo..."
        ref={ref}
        value={inputText}
        onChange={e => setInputText(e.target.value)}
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
