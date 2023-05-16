import { TodoTypes, getTodoList } from '../api/todo';

import { ChangeEvent, useCallback, useEffect, useRef, useState } from 'react';
import { createTodo, searchTodo } from '../api/todo';
import useDebounce from '../hooks/useDebounce';
import styled from 'styled-components';
import { DEBOUNCED_DELAY } from '../constants/constant';
import Header from '../components/Header';
import InputTodo from '../components/InputTodo';
import SearchedList from '../components/SearchedList';
import TodoList from '../components/TodoList';

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

  // currentPage: 현재 페이지
  const [currentPage, setCurrentPage] = useState<number>(1);

  // total: 전체 데이터 개수
  const [total, setTotal] = useState<number>(0);

  // observer: IntersectionObserver 객체
  const observer = useRef<IntersectionObserver | null>(null);

  // debouncedSearchQuery: 디바운스 적용된 검색어
  const debouncedSearchQuery = useDebounce(inputText, DEBOUNCED_DELAY);

  // loadMoreData: 추가 데이터 로드 함수
  const loadMoreData = useCallback(async () => {
    setIsMoreLoading(true);
    const newData = await searchTodo({ q: debouncedSearchQuery, page: currentPage + 1 });
    setSearchedResponse((prevData: string[]) => [...prevData, ...newData.data.result]);
    setTotal(newData.data.total);
    setCurrentPage((prevPage: number) => prevPage + 1);
    setIsMoreLoading(false);
  }, [currentPage, debouncedSearchQuery]);

  // lastItemRef: 마지막 항목의 ref 콜백 함수
  const lastItemRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting) {
          loadMoreData();
        }
      });
      if (node) observer.current.observe(node);
    },
    [loadMoreData]
  );

  // onChangeInput: 입력 값 변경 시 처리 함수
  const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value);
  };

  // handleFocus: 입력창에 포커스가 들어올 때 처리 함수
  const handleFocus = () => setIsFocused(true);

  // handleBlur: 입력창에서 포커스가 벗어날 때 처리 함수
  const handleBlur = () => setIsFocused(false);

  // handleChange: 검색어 변경 시 처리 함수
  const handleChange = useCallback(async () => {
    if (!debouncedSearchQuery) {
      setSearchedResponse([]);
      setTotal(0);
      return;
    }
    const response = await searchTodo({ q: debouncedSearchQuery });
    setSearchedResponse(response.data.result);
    setTotal(response.data.total);
    setCurrentPage(1);
  }, [debouncedSearchQuery]);

  // handleSubmit: 폼 제출 시 처리 함수
  const handleSubmit = useCallback(
    async (e: React.FormEvent, todoText: string) => {
      e.preventDefault();
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
    [inputText]
  );

  useEffect(() => {
    // 검색 결과가 전체 데이터 개수와 동일하다면 더 이상 데이터가 없음
    if (searchedResponse.length === total) {
      setIsNoMoreData(true);
    } else {
      setIsNoMoreData(false);
    }
  }, [searchedResponse.length, total]);

  useEffect(() => {
    // 입력 중인지 여부 설정
    setIsTyping(!!debouncedSearchQuery);
    handleChange();
  }, [handleChange, debouncedSearchQuery]);

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
        />
        {isFocused && (
          <SearchedList
            searchedResponse={searchedResponse}
            inputText={inputText}
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
