import { createContext, useContext, useState } from 'react';

interface ITodoStateContext {
  inputText: string;
}
interface ITodoDispatchContext {
  setInputText: (text: string) => void;
}
const TodoStateContext = createContext<ITodoStateContext | null>(null);
const TodoDispatchContext = createContext<ITodoDispatchContext | null>(null);

function TodoContextProvider({ children }: { children: React.ReactNode }) {
  const [inputText, setInputText] = useState('');

  return (
    <TodoStateContext.Provider value={{ inputText }}>
      <TodoDispatchContext.Provider value={{ setInputText }}>
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
