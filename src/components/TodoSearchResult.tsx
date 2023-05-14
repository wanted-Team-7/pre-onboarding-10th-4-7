import React from 'react';
import styled from 'styled-components';

interface ITodoSearchResult {
  value: string;
}

function TodoSearchResult({ value }: ITodoSearchResult) {
  return <ItemContainer>{value.length > 40 ? value.slice(0, 39) + '...' : value}</ItemContainer>;
  // return <ItemContainer>{value}</ItemContainer>;
  // return <ItemContainer>hasdfkalsdnfhbkjashdfnkasdfhklsdfadsfasdfalhsdnfjlkbabs</ItemContainer>;
}

const ItemContainer = styled.div`
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
  }
`;

export default TodoSearchResult;
