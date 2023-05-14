import { getTodoList } from '../api/todo';
import Header from '../views/Header';
import InputTodo from '../views/Icon/InputTodo';
import TodoList from '../views/TodoList';
import SearchedList from '../views/SearchedList';
import { ChangeEvent, useCallback, useEffect, useRef, useState } from 'react';
import { TodoTypes } from '../types/todo';
import { createTodo, searchTodo } from '../api/todo';
import useDebounce from '../hooks/useDebounce';
import styled from 'styled-components';
import { DEBOUNCED_DELAY } from '../constants/constant';

const Main = () => {
  const [todoListData, setTodoListData] = useState<TodoTypes[]>([]);
  const [searchedResponse, setSearchedResponse] = useState<string[]>([]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isMoreLoading, setIsMoreLoading] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [isNoMoreData, setIsNoMoreData] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState(0);
  const observer = useRef<IntersectionObserver | null>(null);
  const debouncedSearchQuery = useDebounce(inputText, DEBOUNCED_DELAY);

  const lastItemRef = useCallback(
    (node: HTMLDivElement | null) => {
      const loadMoreData = async () => {
        setIsMoreLoading(true);
        const newData = await searchTodo({ q: debouncedSearchQuery, page: currentPage + 1 });
        setSearchedResponse((prevData: string[]) => [...prevData, ...newData.data.result]);
        setTotal(newData.data.total);
        setCurrentPage((prevPage: number) => prevPage + 1);
        setIsMoreLoading(false);
      };
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting) {
          loadMoreData();
        }
      });
      if (node) observer.current.observe(node);
    },
    [currentPage, debouncedSearchQuery]
  );

  useEffect(() => {
    if (searchedResponse.length === total) {
      setIsNoMoreData(true);
    } else {
      setIsNoMoreData(false);
    }
  }, [searchedResponse.length, total]);

  const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value);
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const handleChange = useCallback(async () => {
    if (debouncedSearchQuery) {
      const response = await searchTodo({ q: debouncedSearchQuery });
      setSearchedResponse(response.data.result);
      setTotal(response.data.total);
    } else {
      setSearchedResponse([]);
      setTotal(0);
    }
    setCurrentPage(1);
  }, [debouncedSearchQuery]);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      const trimmed = inputText.trim();
      if (!trimmed) {
        return alert('Please write something');
      }

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
    [inputText]
  );

  useEffect(() => {
    if (debouncedSearchQuery) {
      setIsTyping(true);
    } else {
      setIsTyping(false);
    }
    handleChange();
  }, [handleChange, debouncedSearchQuery]);

  useEffect(() => {
    (async () => {
      const { data } = await getTodoList();
      setTodoListData(data || []);
    })();
  }, []);

  return (
    <Container>
      <Inner>
        <Header />
        <InputTodo
          isTyping={isTyping}
          isLoading={isLoading}
          handleSubmit={handleSubmit}
          inputText={inputText}
          onChangeInput={onChangeInput}
          handleFocus={handleFocus}
          handleBlur={handleBlur}
          isFocused={isFocused}
        />
        {isFocused && (
          <SearchedList
            searchedResponse={searchedResponse}
            inputText={inputText}
            setInputText={setInputText}
            isNoMoreData={isNoMoreData}
            lastItemRef={lastItemRef}
            isMoreLoading={isMoreLoading}
          />
        )}
        <TodoList todos={todoListData} setTodos={setTodoListData} />
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
