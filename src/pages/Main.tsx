import { TodoTypes, getTodoList } from '../api/todo';
import { ChangeEvent, useCallback, useEffect, useRef, useState } from 'react';
import { createTodo } from '../api/todo';
import useDebounce from '../hooks/useDebounce';
import styled from 'styled-components';
import { DEBOUNCED_DELAY } from '../constants/constant';
import Header from '../components/Header';
import InputTodo from '../components/InputTodo';
import SearchedList from '../components/SearchedList';
import TodoList from '../components/TodoList';
import useSearchData from '../hooks/useSearchData';

const Main = () => {
  // todoListData: 할 일 목록 데이터
  const [todoListData, setTodoListData] = useState<TodoTypes[]>([]);

  // searchedResponse: 검색 결과 데이터
  const [searchedResponse, setSearchedResponse] = useState<string[]>([]);

  // inputText: 입력된 텍스트
  const [inputText, setInputText] = useState<string>('');

  // isTyping: 입력 중인지 여부
  const [isTyping, setIsTyping] = useState<boolean>(false);

  // isLoading: 로딩 중인지 여부
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // isMoreLoading: 추가 데이터 로딩 중인지 여부
  const [isMoreLoading, setIsMoreLoading] = useState<boolean>(false);

  // isFocused: 입력창이 포커싱되었는지 여부
  const [isFocused, setIsFocused] = useState<boolean>(false);

  // isNoMoreData: 더 이상 데이터가 없는지 여부
  const [isNoMoreData, setIsNoMoreData] = useState<boolean>(true);

  // observer: IntersectionObserver 객체
  const observer = useRef<IntersectionObserver | null>(null);

  // debouncedSearchQuery: 디바운스 적용된 검색어
  const debouncedSearchQuery = useDebounce(inputText, DEBOUNCED_DELAY);

  // 재 검색 여부 체크
  const checkReSearch = useRef(false);

  // 검색 로딩 여부
  const [isSearchLoading, setSearchLoading] = useState<boolean>(false);

  const handleSearchData = useSearchData({
    setSearchedResponse,
    setIsMoreLoading,
    setIsNoMoreData,
    setSearchLoading,
    checkReSearch,
  });

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
    async (e: React.FormEvent) => {
      e.preventDefault();
      const trimmed = inputText.trim();
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
    [inputText]
  );

  useEffect(() => {
    // 입력 중인지 여부 설정
    setIsTyping(!!debouncedSearchQuery);
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
          isTyping={isTyping}
          isLoading={isLoading}
          handleSubmit={handleSubmit}
          inputText={inputText}
          onChangeInput={onChangeInput}
          handleFocus={handleFocus}
          handleBlur={handleBlur}
          isFocused={isFocused}
          isSearchLoading={isSearchLoading}
        />
        {isFocused && (
          <SearchedList
            searchedResponse={searchedResponse}
            inputText={inputText}
            setInputText={setInputText}
            isNoMoreData={isNoMoreData}
            lastItemRef={lastItemRef}
            isMoreLoading={isMoreLoading}
            isSearchLoading={isSearchLoading}
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
