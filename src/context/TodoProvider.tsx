import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { createTodo, deleteTodo, getTodoList } from '../api/todo';
import { TodoTypes } from '../types/todo';
import { TodoContextType, TodoDispatchType } from '../types/context';

const TodoContext = createContext<TodoContextType | null>(null);
const TodoDispatchContext = createContext<TodoDispatchType | null>(null);

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
      }}
    >
      <TodoDispatchContext.Provider
        value={{
          handleAddTodo,
          handleRemoveTodo,
          handleSubmit,
        }}
      >
        {children}
      </TodoDispatchContext.Provider>
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

export const useTodoDispatch = () => {
  const state = useContext(TodoDispatchContext);
  if (!state) {
    throw new Error('TodoDispatchContextProvider not found');
  }
  return state;
};
