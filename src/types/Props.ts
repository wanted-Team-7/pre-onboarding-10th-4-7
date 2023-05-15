import { TodoTypes } from './todo';

export interface DropDownProps {
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setSearchList: React.Dispatch<React.SetStateAction<string[]>>;
  setTodos: React.Dispatch<React.SetStateAction<TodoTypes[]>>;
  setInputText: React.Dispatch<React.SetStateAction<string>>;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  searchList: string[] | undefined;
  isLoading: boolean;
  currentPage: number;
  inputText: string;
  inputLoading: boolean;
}

export interface InputTodoType {
  setSearchList: React.Dispatch<React.SetStateAction<string[]>>;
  searchList: string[] | undefined;
  inputText: string;
  setInputText: React.Dispatch<React.SetStateAction<string>>;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  setDropdownDisplay: React.Dispatch<React.SetStateAction<boolean>>;
  isLoading: boolean;
  currentPage: number;
  setInputLoading: React.Dispatch<React.SetStateAction<boolean>>;
  inputLoading: boolean;
}
