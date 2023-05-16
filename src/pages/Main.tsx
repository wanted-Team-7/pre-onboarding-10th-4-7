import { useEffect, useState } from 'react';
import { getTodoList } from '../api/todo';
import { TodoTypes } from '../types/todo';
import Header from '../components/Header';
import InputTodo from '../components/InputTodo';
import TodoList from '../components/TodoList';
import DropDown from '../components/DropDown';
import { S } from './style';

const Main = () => {
  const [todoListData, setTodoListData] = useState<TodoTypes[]>([]);
  const [searchList, setSearchList] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [inputText, setInputText] = useState<string>('');
  const [dropdownDisplay, setDropdownDisplay] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(false);
  const [inputLoading, setInputLoading] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      const { data } = await getTodoList();
      setTodoListData(data || []);
    })();
  }, []);

  return (
    <S.Container>
      <S.Inner>
        <Header />
        <InputTodo
          searchList={searchList}
          setSearchList={setSearchList}
          inputText={inputText}
          setInputText={setInputText}
          setCurrentPage={setCurrentPage}
          setDropdownDisplay={setDropdownDisplay}
          isLoading={isLoading}
          currentPage={currentPage}
          inputLoading={inputLoading}
          setInputLoading={setInputLoading}
        />
        {dropdownDisplay ? (
          <DropDown
            searchList={searchList}
            setSearchList={setSearchList}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            inputText={inputText}
            setTodos={setTodoListData}
            setInputText={setInputText}
            setIsLoading={setIsLoading}
            isLoading={isLoading}
            inputLoading={inputLoading}
          />
        ) : null}
        <TodoList todos={todoListData} setTodos={setTodoListData} />
      </S.Inner>
    </S.Container>
  );
};

export default Main;
