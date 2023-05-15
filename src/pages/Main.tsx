import { useEffect, useState } from 'react';
import { getTodoList, searchTodoList } from '../api/todo';
import { TodoTypes } from '../types/todo';
import useFocus from '../hooks/useFocus';
import Header from '../components/Header';
import InputTodo from '../components/InputTodo';
import TodoList from '../components/TodoList';
import DropDown from '../components/DropDown';

const Main = () => {
  const [inputText, setInputText] = useState('');
  const [isSearchLoading, setIsSearchLoading] = useState(false);
  const [isTotal, setIsTotal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchListData, setSearchListData] = useState<string[]>([]);
  const [todoListData, setTodoListData] = useState<TodoTypes[]>([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { ref: inputRef, setFocus: setInputFocus } = useFocus();
  const { ref: dropdownRef } = useFocus();

  const handleInputClick = () => {
    setIsDropdownOpen(true);
  };

  const handleSearchFetch = async (type: string) => {
    if (inputText.trim() === '') {
      setSearchListData([]);
      return;
    }
    if (type === 'first') {
      setCurrentPage(1);
      setSearchListData([]);
    }
    if (type === 'scroll') setCurrentPage(prev => prev + 1);
    setIsSearchLoading(true);
    const updateCurrentPage = type === 'scroll' ? currentPage + 1 : 1;
    const { data } = await searchTodoList({ q: inputText, page: updateCurrentPage, limit: 10 });
    setSearchListData(prev => [...prev, ...data.result]);
    setIsTotal(data.page * data.limit >= data.total);
    setIsSearchLoading(false);
  };

  useEffect(() => {
    (async () => {
      const { data } = await getTodoList();
      setTodoListData(data || []);
    })();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        inputRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [dropdownRef, inputRef]);

  return (
    <div className="container">
      <div className="inner">
        <Header />
        <InputTodo
          setTodos={setTodoListData}
          inputRef={inputRef}
          setInputFocus={setInputFocus}
          handleInputClick={handleInputClick}
          inputText={inputText}
          setInputText={setInputText}
          handleSearchFetch={handleSearchFetch}
        />
        {isDropdownOpen && inputText && searchListData.length > 0 && (
          <DropDown
            dropdownRef={dropdownRef}
            searchListData={searchListData}
            isSearchLoading={isSearchLoading}
            isTotal={isTotal}
            handleSearchFetch={handleSearchFetch}
          />
        )}
        <TodoList todos={todoListData} setTodos={setTodoListData} />
      </div>
    </div>
  );
};

export default Main;
