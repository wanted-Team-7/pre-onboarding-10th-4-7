import { useContext, useState } from 'react';
import styled from 'styled-components';
import { TodoDispatchContext, TodoStateContext } from '../pages/Main';
import { createTodo } from '../api/todo';

interface ITodoSearchResult {
  value: string;
}

function TodoSearchResult({ value }: ITodoSearchResult) {
  const [isClicked, setIsClicked] = useState(false);
  const todoDispatch = useContext(TodoDispatchContext);
  const todoState = useContext(TodoStateContext);

  const omittedValue = value.length > 40 ? value.slice(0, 39) + '...' : value;
  const splitValue = omittedValue.split(todoState?.inputText ?? '');

  const handleClick = async () => {
    try {
      setIsClicked(true);
      const { data } = await createTodo({ title: value });
      if (data) {
        todoDispatch?.setTodoListData(prevTodos => [...prevTodos, data]);
        todoDispatch?.setInputText('');
        todoDispatch?.setSearchResults([]);
      }
    } catch (error) {
      console.error(error);
      alert('Something went wrong.');
    }
  };

  return (
    <ItemContainer onClick={handleClick} isClicked={isClicked}>
      <Span>{splitValue[0]}</Span>
      <Strong>{todoState?.inputText ?? ''}</Strong>
      <Span>{splitValue[1]}</Span>
    </ItemContainer>
  );
}

const ItemContainer = styled.div<{ isClicked: boolean }>`
  width: 100%;
  height: 28px;
  padding: 6px 12px;
  gap: 10px;

  /* display: flex; */
  /* justify-content: space-between; */
  /* align-items: center; */

  background-color: #ffffff;
  border-radius: 3px;

  white-space: nowrap;

  &:hover {
    background-color: #f2f2f2;
    cursor: pointer;
  }

  ${props =>
    props.isClicked &&
    `
      background-color: #d5f4f1;
      &:hover {
        background-color: #d5f4f1;
      }
  `}
`;
const Span = styled.span``;
const Strong = styled.span`
  color: #2bc9ba;
  margin: 0;
`;

export default TodoSearchResult;
