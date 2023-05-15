import { useEffect, useRef } from 'react';
import { SearchItem } from './SearchList.styled';

interface SearchListItemTyep {
  searchKeyword: string;
  isFocus: boolean;
  inputText: string;
}

const SearchListItem = ({ searchKeyword, isFocus, inputText }: SearchListItemTyep) => {
  const focusRef = useRef<HTMLLIElement>(null);
  useEffect(() => {
    focusRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
  }, [isFocus]);

  return (
    <SearchItem isFocus={isFocus} ref={focusRef}>
      {searchKeyword.split(inputText)[0]}
      <span>{inputText}</span>
      {searchKeyword.split(inputText)[1]}
    </SearchItem>
  );
};

export default SearchListItem;
