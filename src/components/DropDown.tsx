import React from 'react';
import styled from 'styled-components';
import { ReactComponent as Union } from '../assets/union_icon.svg';
import { ReactComponent as Spinner } from '../assets/spinner_icon.svg';
import useIntersectionObserver from '../hooks/useIntersectionObserver';
import { createTodo } from '../api/todo';
import { TodoTypes } from '../types/todo';

interface DropdownType {
  dropdownRef: React.RefObject<HTMLUListElement>;
  searchListData: string[];
  isSearchLoading: boolean;
  isTotal: boolean;
  handleSearchFetch: (type: string) => void;
  setTodos: React.Dispatch<React.SetStateAction<TodoTypes[]>>;
}

function DropDown({
  dropdownRef,
  searchListData,
  isSearchLoading,
  isTotal,
  handleSearchFetch,
  setTodos,
}: DropdownType) {
  const onIntersect: IntersectionObserverCallback = ([{ isIntersecting }]) => {
    if (isIntersecting && !isTotal && !isSearchLoading) {
      handleSearchFetch('scroll');
    }
  };
  const { setTarget } = useIntersectionObserver({ onIntersect });

  const handleAddTodoClick = async (todo: string) => {
    const { data } = await createTodo({ title: todo });
    if (data) {
      return setTodos(prev => [...prev, data]);
    }
  };

  return (
    <DropdownBox ref={dropdownRef}>
      {searchListData.map((item, idx) => (
        <DropdownItem key={idx} onClick={() => handleAddTodoClick(item)}>
          {item}
        </DropdownItem>
      ))}
      {!isTotal && (
        <IntersectionBox ref={setTarget}>
          {isSearchLoading ? <Spinner className="spinner" /> : !isTotal && <Union />}
        </IntersectionBox>
      )}
    </DropdownBox>
  );
}

export default DropDown;

const DropdownBox = styled.ul`
  width: 580px;
  margin-top: -16px;
  min-height: 28px;
  max-height: 164px;
  position: absolute;
  z-index: 100;
  padding: 9px 5px 0px 5px;
  box-sizing: border-box;
  background-color: #fff;
  border: 1px solid #dedede;
  border-radius: 5px;
  box-shadow: 0px 0px 1px rgba(50, 50, 50, 0.05), 0px 2px 4px rgba(50, 50, 50, 0.1);
  overflow-y: scroll;
  ::-webkit-scrollbar {
    width: 5px;
  }
  ::-webkit-scrollbar-thumb {
    border-radius: 2px;
    background-color: rgba(0, 0, 0, 0.48);
  }
`;

const DropdownItem = styled.li`
  list-style-type: none;
  box-sizing: border-box;
  cursor: pointer;
  padding: 6px 12px;
  border-radius: 3px;
  :hover {
    background: #f2f2f2;
  }
  :active {
    background: #d5f4f1;
  }
`;

const IntersectionBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 29px;
  .spinner {
    animation: spin 0.8s infinite ease-in-out;
  }
`;
