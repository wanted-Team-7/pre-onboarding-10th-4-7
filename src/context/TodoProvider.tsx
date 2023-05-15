import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { createTodo, deleteTodo, getTodoList } from '../api/todo';
import { TodoTypes } from '../types/todo';

interface TodoContextType {
  inputText: string;
  setInputText: React.Dispatch<React.SetStateAction<string>>;
  todoListData: TodoTypes[];
  isAddLoading: boolean;
  handleRemoveTodo: (
    id: string,
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
  ) => Promise<void>;
  handleAddTodo: (todo: string) => Promise<void>;
  handleSubmit: (event: React.FormEvent) => Promise<void>;
}

const TodoContext = createContext<TodoContextType | null>(null);

export const useTodo = () => useContext(TodoContext);

export function TodoProvider({ children }: React.PropsWithChildren) {
  const [inputText, setInputText] = useState('');
  const [todoListData, setTodoListData] = useState<TodoTypes[]>([]);
  const [isAddLoading, setIsAddLoading] = useState(false);

  const handleRemoveTodo = useCallback(
    async (id: string, setIsLoading: React.Dispatch<React.SetStateAction<boolean>>) => {
      try {
        setIsLoading(true);
        await deleteTodo(id);

        setTodoListData(prev => prev.filter((item: TodoTypes) => item.id !== id));
      } catch (error) {
        console.error(error);
        alert('Something went wrong.');
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  const handleAddTodo = async (todo: string) => {
    const { data } = await createTodo({ title: todo });
    if (data) {
      setTodoListData(prev => [...prev, data]);
      setInputText('');
      return;
    }
  };

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      try {
        e.preventDefault();
        setIsAddLoading(true);

        const trimmed = inputText.trim();
        if (!trimmed) {
          return alert('Please write something');
        }

        const newItem = { title: trimmed };
        const { data } = await createTodo(newItem);

        if (data) {
          return setTodoListData(prev => [...prev, data]);
        }
      } catch (error) {
        console.error(error);
        alert('Something went wrong.');
      } finally {
        setInputText('');
        setIsAddLoading(false);
      }
    },
    [inputText, setInputText]
  );

  useEffect(() => {
    (async () => {
      const { data } = await getTodoList();
      setTodoListData(data || []);
    })();
  }, []);

  return (
    <TodoContext.Provider
      value={{
        inputText,
        setInputText,
        todoListData,
        isAddLoading,
        handleAddTodo,
        handleRemoveTodo,
        handleSubmit,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
}

export const useTodoState = () => {
  const state = useContext(TodoContext);
  if (!state) {
    throw new Error('TodoContextProvider not found');
  }
  return state;
};
