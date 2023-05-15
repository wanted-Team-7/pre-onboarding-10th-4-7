import { SearchListBox } from './SearchList.styled';

interface SearchListType {
  searchKeywordList: string[];
}

const SearchList = ({ searchKeywordList }: SearchListType) => {
  return (
    <SearchListBox>
      {searchKeywordList.map(searhKeyword => (
        <li>{searhKeyword}</li>
      ))}
    </SearchListBox>
  );
};

export default SearchList;
