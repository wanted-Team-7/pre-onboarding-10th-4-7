import { useEffect, useRef, useState } from 'react';
import Header from '../components/Header';
import InputTodo from '../components/InputTodo';
import TodoList from '../components/TodoList';
import SearchList from '../components/SearchList';
import { createTodo, getTodoList, searchTodoKeyword } from '../api/todo';
import { TodoTypes } from '../types/todo';

const Main = () => {
  const [inputText, setInputText] = useState<string>('');
  const [searchKeywordList, setSearchKeywordList] = useState<string[]>([]);
  const [todoListData, setTodoListData] = useState<TodoTypes[]>([]);
  const [focusIndex, setFocusIndex] = useState<number>(-1);
  const focusRef = useRef<HTMLUListElement>(null);

  const keydownHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.nativeEvent.isComposing) return;
    switch (e.key) {
      case 'ArrowUp':
        e.preventDefault();
        setFocusIndex(prevIndex => (prevIndex <= 0 ? searchKeywordList.length - 1 : prevIndex - 1));
        break;
      case 'ArrowDown':
        e.preventDefault();
        setFocusIndex(prevIndex => (prevIndex >= searchKeywordList.length - 1 ? 0 : prevIndex + 1));
        break;
      case 'Enter':
        break;
      default:
        break;
    }
  };

  const addKeywordTodo = async (keyword: string) => {
    const newItem = { title: keyword };
    const { data } = await createTodo(newItem);

    if (data) {
      return setTodoListData(prev => [...prev, data]);
    }
  };

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
          keydownHandler={keydownHandler}
        />
        {searchKeywordList.length > 0 ? (
          <SearchList
            searchKeywordList={searchKeywordList}
            focusRef={focusRef}
            focusIndex={focusIndex}
            inputText={inputText}
            setInputText={setInputText}
            addKeywordTodo={addKeywordTodo}
          />
        ) : null}
        <TodoList todos={todoListData} setTodos={setTodoListData} />
      </div>
    </div>
  );
};

export default Main;
