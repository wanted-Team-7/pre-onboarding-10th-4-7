import SearchListItem from './SearchListItem';
import { SearchListBox } from './SearchList.styled';

interface SearchListType {
  searchKeywordList: string[];
  focusRef: React.RefObject<HTMLUListElement>;
  focusIndex: number;
  inputText: string;
}

const SearchList = ({ searchKeywordList, focusRef, focusIndex, inputText }: SearchListType) => {
  return (
    <SearchListBox ref={focusRef}>
      {searchKeywordList.map((searhKeyword, idx) => (
        <SearchListItem
          searchKeyword={searhKeyword}
          isFocus={idx === focusIndex ? true : false}
          inputText={inputText}
        />
      ))}
    </SearchListBox>
  );
};

export default SearchList;
