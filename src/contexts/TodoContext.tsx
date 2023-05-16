import { createContext, useContext, useState } from 'react';
import { TodoTypes } from '../api/todo';

interface ITodoStateContext {
  inputText: string;
  todoListData: TodoTypes[];
}
interface ITodoDispatchContext {
  setInputText: React.Dispatch<React.SetStateAction<string>>;
  setTodoListData: React.Dispatch<React.SetStateAction<TodoTypes[]>>;
}
const TodoStateContext = createContext<ITodoStateContext | null>(null);
const TodoDispatchContext = createContext<ITodoDispatchContext | null>(null);

function TodoContextProvider({ children }: { children: React.ReactNode }) {
  const [inputText, setInputText] = useState('');
  const [todoListData, setTodoListData] = useState<TodoTypes[]>([]);

  return (
    <TodoStateContext.Provider value={{ inputText, todoListData }}>
      <TodoDispatchContext.Provider value={{ setInputText, setTodoListData }}>
        {children}
      </TodoDispatchContext.Provider>
    </TodoStateContext.Provider>
  );
}

export const useTodoState = () => {
  const value = useContext(TodoStateContext);
  if (!value) throw new Error('useTodoState should be used within TodoContextProvider');
  return value;
};
export const useTodoDispatch = () => {
  const value = useContext(TodoDispatchContext);
  if (!value) throw new Error('useTodoDispatch should be used within TodoContextProvider');
  return value;
};

export default TodoContextProvider;
