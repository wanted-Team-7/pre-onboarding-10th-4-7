import { useEffect, useState } from 'react';
import { getTodoList } from '../api/todo';
import { TodoTypes } from '../types/todo';
import Header from '../components/Header';
import InputTodo from '../components/InputTodo';
import TodoList from '../components/TodoList';
import DropDown from '../components/DropDown';

const Main = () => {
  const [todoListData, setTodoListData] = useState<TodoTypes[]>([]);
  const [searchList, setSearchList] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [inputText, setInputText] = useState<string>('');

  useEffect(() => {
    (async () => {
      const { data } = await getTodoList();
      setTodoListData(data || []);
    })();
  }, []);

  return (
    <div className="container">
      <div className="inner">
        <Header />
        <InputTodo
          setTodos={setTodoListData}
          searchList={searchList}
          setSearchList={setSearchList}
          currentPage={currentPage}
          inputText={inputText}
          setInputText={setInputText}
          setCurrentPage={setCurrentPage}
        />
        <DropDown
          searchList={searchList}
          setSearchList={setSearchList}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          inputText={inputText}
        />
        <TodoList todos={todoListData} setTodos={setTodoListData} />
      </div>
    </div>
  );
};

export default Main;
