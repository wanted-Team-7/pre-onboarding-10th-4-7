import { ChangeEvent, useCallback, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { getTodoList } from '../api/todo';
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
  // inputText: 입력된 텍스트 & todoListData: 할 일 목록 데이터
  const { inputText, todoListData } = useTodoState();
  const { setInputText, setTodoListData } = useTodoDispatch();

  // isLoading: 로딩 중인지 여부
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // isFocused: 입력창이 포커싱되었는지 여부
  const [isFocused, setIsFocused] = useState<boolean>(false);

  // observer: IntersectionObserver 객체
  const observer = useRef<IntersectionObserver | null>(null);

  // debouncedSearchQuery: 디바운스 적용된 검색어
  const debouncedSearchQuery = useDebounce(inputText, DEBOUNCED_DELAY);

  // 재 검색 여부 체크
  const checkReSearch = useRef(false);

  // 검색 로딩 여부
  const [isSearchLoading, setSearchLoading] = useState<boolean>(false);
  
  const { handleSearchData, searchedResponse, isMoreLoading, isMoreData } = useSearchData({ setSearchLoading,
    checkReSearch,});

  // lastItemRef: 마지막 항목의 ref 콜백 함수
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

  // onChangeInput: 입력 값 변경 시 처리 함수
  const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length === 0) checkReSearch.current = true;
    setInputText(e.target.value);
  };

  // handleFocus: 입력창에 포커스가 들어올 때 처리 함수
  const handleFocus = () => setIsFocused(true);

  // handleBlur: 입력창에서 포커스가 벗어날 때 처리 함수
  const handleBlur = () => setIsFocused(false);

  // handleSubmit: 폼 제출 시 처리 함수
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
    // 입력 중인지 여부 설정
    handleSearchData('first', debouncedSearchQuery);
  }, [debouncedSearchQuery]);

  useEffect(() => {
    // 할 일 목록 데이터 로드
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
