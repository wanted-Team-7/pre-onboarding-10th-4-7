import { useEffect, useRef } from 'react';
import { SearchItem } from '../style/SearchList.styled';
interface SearchListItemTyep {
  searchKeyword: string;
  isFocus: boolean;
  inputText: string;
  addKeywordTodo: (keyword: string) => Promise<void>;
  setInputText: React.Dispatch<React.SetStateAction<string>>;
}

const SearchListItem = ({
  searchKeyword,
  isFocus,
  inputText,
  addKeywordTodo,
  setInputText,
}: SearchListItemTyep) => {
  const focusRef = useRef<HTMLLIElement>(null);
  useEffect(() => {
    focusRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
  }, [isFocus]);

  const selectRelativeKeyword = (e: React.MouseEvent<HTMLLIElement>) => {
    const data = e.currentTarget.innerText;
    addKeywordTodo(data);
    setInputText('');
  };

  return (
    <SearchItem isFocus={isFocus} ref={focusRef} onClick={selectRelativeKeyword}>
      {searchKeyword.split(inputText)[0]}
      <span>{inputText}</span>
      {searchKeyword.split(inputText)[1]}
    </SearchItem>
  );
};

export default SearchListItem;
