import SearchListItem from './SearchListItem';
import { FaSpinner } from 'react-icons/fa';
import { SearchListBox } from '../style/SearchList.styled';
interface SearchListType {
  searchKeywordList: string[];
  focusRef: React.RefObject<HTMLUListElement>;
  focusIndex: number;
  inputText: string;
  isLoading: boolean;
  addKeywordTodo: (keyword: string) => Promise<void>;
  setInputText: React.Dispatch<React.SetStateAction<string>>;
}

const SearchList = ({
  searchKeywordList,
  focusRef,
  focusIndex,
  inputText,
  isLoading,
  addKeywordTodo,
  setInputText,
}: SearchListType) => {
  return (
    <SearchListBox ref={focusRef}>
      {isLoading ? (
        <FaSpinner className="spinner" />
      ) : (
        searchKeywordList.map((searhKeyword, idx) => (
          <SearchListItem
            key={idx}
            searchKeyword={searhKeyword}
            isFocus={idx === focusIndex ? true : false}
            inputText={inputText}
            setInputText={setInputText}
            addKeywordTodo={addKeywordTodo}
          />
        ))
      )}
      {searchKeywordList.length === 0 && <span>검색 결과가 없습니다.</span>}
    </SearchListBox>
  );
};

export default SearchList;
