import { useEffect, useState } from 'react';
import { getTodoList } from '../api/todo';
import { TodoTypes } from '../types/todo';
import useFocus from '../hooks/useFocus';
import Header from '../components/Header';
import InputTodo from '../components/InputTodo';
import TodoList from '../components/TodoList';
import DropDown from '../components/DropDown';

const Main = () => {
  const [todoListData, setTodoListData] = useState<TodoTypes[]>([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { ref: inputRef, setFocus: setInputFocus } = useFocus();
  const { ref: dropdownRef } = useFocus();

  const handleInputClick = () => {
    setIsDropdownOpen(true);
  };

  useEffect(() => {
    (async () => {
      const { data } = await getTodoList();
      setTodoListData(data || []);
    })();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        inputRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [dropdownRef, inputRef]);

  return (
    <div className="container">
      <div className="inner">
        <Header />
        <InputTodo
          setTodos={setTodoListData}
          inputRef={inputRef}
          setInputFocus={setInputFocus}
          handleInputClick={handleInputClick}
        />
        {isDropdownOpen && <DropDown dropdownRef={dropdownRef} />}
        <TodoList todos={todoListData} setTodos={setTodoListData} />
      </div>
    </div>
  );
};

export default Main;
