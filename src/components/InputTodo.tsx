import { FiSearch } from 'react-icons/fi';
import { useEffect, useRef } from 'react';
import { useDebounce } from '../hooks/useDebounce';
import { S } from './style';
import { INIT_PAGE, DELAY_TIME, LIMIT_STR_LENGTH, PER_PAGE_LIMIT_COUNT } from '../util/constant';
import { ellipsis } from '../util/ellipsis';
import { getSearchList } from '../api/todo';
import { InputTodoType } from '../types/Props';

const InputTodo = ({
  setSearchList,
  inputText,
  setInputText,
  setCurrentPage,
  setDropdownDisplay,
  isLoading,
  currentPage,
  inputLoading,
  setInputLoading,
}: InputTodoType) => {
  const debounceValue = useDebounce(inputText, DELAY_TIME);

  // 재 검색 flag
  const loaderFlag = useRef(true);

  // get Api 호출
  const getDataInput = async () => {
    try {
      setInputLoading(true);
      const res = await getSearchList(inputText, currentPage, PER_PAGE_LIMIT_COUNT);
      setSearchList(prev => [...prev, ...res.result]);
    } catch (error) {
      console.log(error);
    } finally {
      setInputLoading(false);
    }
  };

  useEffect(() => {
    getDataInput();
    if (debounceValue.length !== 0) {
      setDropdownDisplay(true); // 검색어 입력할 경우 DropDown display(true)
    } else {
      setDropdownDisplay(false);
    } // 검색어가 없을 경우 DropDown display(false)

    // 재검색할 경우
    if (loaderFlag.current === true) {
      setSearchList([]);
      setCurrentPage(INIT_PAGE);
    }
  }, [debounceValue]);

  const onChangeInputValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(ellipsis(e.target.value, LIMIT_STR_LENGTH));
    if (e.target.value.length === 0) loaderFlag.current = true;
  };

  return (
    <S.InputForm>
      <FiSearch />
      <S.Input
        placeholder="Add new todo..."
        value={inputText}
        onChange={onChangeInputValue}
        disabled={isLoading}
      />
      {inputLoading ? <S.Spinner /> : null}
    </S.InputForm>
  );
};

export default InputTodo;
