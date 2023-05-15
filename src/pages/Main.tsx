import { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import { createTodo, getTodoList, searchTodoList } from '../api/todo';
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
  const dropdownRef = useRef<HTMLUListElement>(null);

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

  const handleAddTodoClick = async (todo: string) => {
    const { data } = await createTodo({ title: todo });
    if (data) {
      setTodoListData(prev => [...prev, data]);
      setInputText('');
      return;
    }
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
    <Container>
      <Inner>
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
            inputText={inputText}
            handleSearchFetch={handleSearchFetch}
            handleAddTodoClick={handleAddTodoClick}
          />
        )}
        <TodoList todos={todoListData} setTodos={setTodoListData} />
      </Inner>
    </Container>
  );
};

export default Main;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  max-width: 600px;
  margin: 0 auto;
`;

const Inner = styled.div`
  width: 100%;
  padding: 8rem 10px 4rem;
  position: relative;
`;
