import { useEffect, useState } from 'react';
import Header from '../components/Header';
import InputTodo from '../components/InputTodo';
import TodoList from '../components/TodoList';
import SearchList from '../components/SearchList';
import { getTodoList, searchTodoKeyword } from '../api/todo';
import { TodoTypes } from '../types/todo';

const Main = () => {
  const [inputText, setInputText] = useState<string>('');
  const [searchKeywordList, setSearchKeywordList] = useState<string[]>([]);
  const [todoListData, setTodoListData] = useState<TodoTypes[]>([]);

  const getSearchKeywordHandler = async (input: string) => {
    if (input.trim() === '') {
      setSearchKeywordList([]);
      return;
    }

    const { data } = await searchTodoKeyword({ keyword: input, page: 1 });
    setSearchKeywordList(data.result);
  };

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
          inputText={inputText}
          setInputText={setInputText}
          getSearchKeywordHandler={getSearchKeywordHandler}
        />
        {searchKeywordList.length > 0 ? <SearchList searchKeywordList={searchKeywordList} /> : null}
        <TodoList todos={todoListData} setTodos={setTodoListData} />
      </div>
    </div>
  );
};

export default Main;
