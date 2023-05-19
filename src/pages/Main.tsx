import { ChangeEvent, useCallback, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { createTodo } from '../api/todo';
import useDebounce from '../hooks/useDebounce';
import useSearchData from '../hooks/useSearchData';
import { DEBOUNCED_DELAY } from '../constants/constant';
import Header from '../components/Header';
import InputTodo from '../components/InputTodo';
import SearchedList from '../components/SearchedList';
import TodoList from '../components/TodoList';
import { useTodoDispatch, useTodoState } from '../contexts/TodoContext';

const Main = () => {
  const { inputText, todoListData } = useTodoState();
  const { setInputText, setTodoListData } = useTodoDispatch();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const observer = useRef<IntersectionObserver | null>(null);
  const debouncedSearchQuery = useDebounce(inputText, DEBOUNCED_DELAY);

  const {
    handleSearchData,
    searchedResponse,
    isMoreLoading,
    isMoreData,
    checkReSearch,
    isSearchLoading,
  } = useSearchData();

  const lastItemRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting && !checkReSearch.current) {
          handleSearchData('scroll', debouncedSearchQuery);
        }
      });
      if (node) observer.current.observe(node);
    },
    [debouncedSearchQuery, handleSearchData]
  );

  const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length === 0) checkReSearch.current = true;
    setInputText(e.target.value);
  };

  const handleFocus = () => setIsFocused(true);

  const handleBlur = () => setIsFocused(false);

  const handleSubmit = useCallback(
    async (e: React.FormEvent, todoText: string) => {
      e.preventDefault();
      if (isLoading) return;
      const trimmed = todoText.trim();
      if (!trimmed) return alert('Please write something');
      setIsLoading(true);
      const newItem = { title: trimmed };
      const { data } = await createTodo(newItem);
      if (data) {
        setTodoListData(prev => [...prev, data]);
      }

      setInputText('');
      setIsLoading(false);
      setIsFocused(false);
    },
    [isLoading]
  );

  useEffect(() => {
    handleSearchData('first', debouncedSearchQuery);
  }, [debouncedSearchQuery]);

  return (
    <Container>
      <Inner>
        <Header />
        <InputTodo
          isLoading={isLoading}
          handleSubmit={handleSubmit}
          inputText={inputText}
          onChangeInput={onChangeInput}
          handleFocus={handleFocus}
          handleBlur={handleBlur}
          isFocused={isFocused}
          isSearchLoading={isSearchLoading}
        />
        {debouncedSearchQuery && isFocused && (
          <SearchedList
            searchedResponse={searchedResponse}
            inputText={inputText}
            isMoreData={isMoreData}
            lastItemRef={lastItemRef}
            isMoreLoading={isMoreLoading}
            isSearchLoading={isSearchLoading}
            handleSubmit={handleSubmit}
          />
        )}
        <TodoList todos={todoListData} />
      </Inner>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  max-width: 600px;
  margin: 0 auto;
`;

const Inner = styled.div`
  position: relative;
  width: 100%;
  padding: 8rem 10px 4rem;
`;

export default Main;
