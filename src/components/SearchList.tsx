import SearchListItem from './SearchListItem';
import { SearchListBox } from '../style/SearchList.styled';
interface SearchListType {
  searchKeywordList: string[];
  focusRef: React.RefObject<HTMLUListElement>;
  focusIndex: number;
  inputText: string;
  addKeywordTodo: (keyword: string) => Promise<void>;
  setInputText: React.Dispatch<React.SetStateAction<string>>;
}

const SearchList = ({
  searchKeywordList,
  focusRef,
  focusIndex,
  inputText,
  addKeywordTodo,
  setInputText,
}: SearchListType) => {
  return (
    <SearchListBox ref={focusRef}>
      {searchKeywordList.map((searhKeyword, idx) => (
        <SearchListItem
          searchKeyword={searhKeyword}
          isFocus={idx === focusIndex ? true : false}
          inputText={inputText}
          setInputText={setInputText}
          addKeywordTodo={addKeywordTodo}
        />
      ))}
    </SearchListBox>
  );
};

export default SearchList;
