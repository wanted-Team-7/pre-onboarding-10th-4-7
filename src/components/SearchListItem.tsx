import { useEffect, useRef } from 'react';
import { SearchItem } from './SearchList.styled';

interface SearchListItemTyep {
  searchKeyword: string;
  isFocus: boolean;
}

const SearchListItem = ({ searchKeyword, isFocus }: SearchListItemTyep) => {
  const focusRef = useRef<HTMLLIElement>(null);
  useEffect(() => {
    focusRef.current?.scrollIntoView(false);
  }, [isFocus]);
  return (
    <SearchItem isFocus={isFocus} ref={focusRef}>
      {searchKeyword}
    </SearchItem>
  );
};

export default SearchListItem;
