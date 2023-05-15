import { TodoTypes } from './todo';

export interface TodoContextType {
  inputText: string;
  setInputText: React.Dispatch<React.SetStateAction<string>>;
  todoListData: TodoTypes[];
  isAddLoading: boolean;
}

export interface TodoDispatchType {
  handleRemoveTodo: (
    id: string,
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
  ) => Promise<void>;
  handleAddTodo: (todo: string) => Promise<void>;
  handleSubmit: (event: React.FormEvent) => Promise<void>;
}

export interface SearchContextType {
  isTotal: boolean;
  isSearchLoading: boolean;
  searchListData: string[];
}

export interface SearchDispatchType {
  handleSearchFetch: (type: string, inputText: string) => Promise<void>;
}
