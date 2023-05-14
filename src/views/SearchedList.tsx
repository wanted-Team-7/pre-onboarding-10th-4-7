import styled from 'styled-components';
import SearchedItem from '../components/SearchedItem';

interface SearchedListProps {
  searchedResponse: string[];
  inputText: string;
  setInputText: React.Dispatch<React.SetStateAction<string>>;
}

const SearchedList = ({ searchedResponse, inputText, setInputText }: SearchedListProps) => {
  return (
    <Container>
      <ul>
        {searchedResponse &&
          searchedResponse.map((item: string, index: number) => (
            <SearchedItem
              key={index}
              item={item}
              inputText={inputText}
              setInputText={setInputText}
            />
          ))}
      </ul>
    </Container>
  );
};
const Container = styled.div`
  z-index: 1;
  position: absolute;
  padding: 9px 5px;
  border-radius: 5px;
  width: 97%;
  height: 193px;
  background-color: #fff;
  border: 1px solid #dedede;
  box-shadow: 0 2px 4px 0 rgba(50, 50, 50, 0.1);

  overflow-y: scroll;
`;
export default SearchedList;
