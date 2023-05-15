import SearchListItem from './SearchListItem';
import { SearchListBox } from './SearchList.styled';

interface SearchListType {
  searchKeywordList: string[];
  focusRef: React.RefObject<HTMLUListElement>;
  focusIndex: number;
}

const SearchList = ({ searchKeywordList, focusRef, focusIndex }: SearchListType) => {
  return (
    <SearchListBox ref={focusRef}>
      {searchKeywordList.map((searhKeyword, idx) => (
        <SearchListItem searchKeyword={searhKeyword} isFocus={idx === focusIndex ? true : false} />
      ))}
    </SearchListBox>
  );
};

export default SearchList;
