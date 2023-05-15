import { useContext, useState } from 'react';
import styled from 'styled-components';
import { TodoDispatchContext } from '../pages/Main';
import { createTodo } from '../api/todo';

interface ITodoSearchResult {
  value: string;
}

function TodoSearchResult({ value }: ITodoSearchResult) {
  const [isClicked, setIsClicked] = useState(false);
  const dispatch = useContext(TodoDispatchContext);
  const handleClick = async () => {
    try {
      setIsClicked(true);
      const { data } = await createTodo({ title: value });
      if (data) {
        dispatch?.setTodoListData(prevTodos => [...prevTodos, data]);
        dispatch?.setInputText('');
        dispatch?.setSearchResults([]);
      }
    } catch (error) {
      console.error(error);
      alert('Something went wrong.');
    }
  };

  return (
    <ItemContainer onClick={handleClick} isClicked={isClicked}>
      {value.length > 40 ? value.slice(0, 39) + '...' : value}
    </ItemContainer>
  );
}

const ItemContainer = styled.div<{ isClicked: boolean }>`
  /* font color #2BC9BA  */
  width: 100%;
  height: 28px;
  padding: 6px 12px;
  gap: 10px;

  display: flex;
  align-items: center;

  background-color: #ffffff;
  /* background-color: #d5f4f1; */
  border-radius: 3px;

  white-space: nowrap;

  &:hover {
    background-color: #f2f2f2;
    cursor: pointer;
  }

  ${props =>
    props.isClicked &&
    `
      color: #2bc9ba;
      background-color: #d5f4f1;
      &:hover {
        background-color: #d5f4f1;
      }
  `}
`;

export default TodoSearchResult;
