import { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import { searchTodoList } from '../api/todo';
import useFocus from '../hooks/useFocus';
import Header from '../components/Header';
import InputTodo from '../components/InputTodo';
import TodoList from '../components/TodoList';
import DropDown from '../components/DropDown';
import { useTodoDispatch, useTodoState } from '../context/TodoProvider';

const Main = () => {
  const { inputText } = useTodoState();
  const { handleAddTodo } = useTodoDispatch();
  const [isSearchLoading, setIsSearchLoading] = useState(false);
  const [isTotal, setIsTotal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchListData, setSearchListData] = useState<string[]>([]);
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
          inputRef={inputRef}
          setInputFocus={setInputFocus}
          handleInputClick={handleInputClick}
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
            handleAddTodoClick={handleAddTodo}
          />
        )}
        <TodoList />
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
