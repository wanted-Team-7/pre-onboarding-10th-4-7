import { getTodoList } from '../api/todo';
import Header from '../views/Header';
import InputTodo from '../views/Icon/InputTodo';
import TodoList from '../views/TodoList';
import SearchedList from '../views/SearchedList';
import { ChangeEvent, useCallback, useEffect, useState } from 'react';
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
  const [isFocused, setIsFocused] = useState(false);
  const debouncedSearchQuery = useDebounce(inputText, DEBOUNCED_DELAY);

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
      console.log(response.data);
      setSearchedResponse(response.data.result);
    } else {
      setSearchedResponse([]);
    }
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
