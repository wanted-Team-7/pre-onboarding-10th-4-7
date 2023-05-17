import styled from 'styled-components';
import SearchedItem from '../components/SearchedItem';
import { Spinner } from './Icon/TrashIcon';

interface SearchedListProps {
  searchedResponse: string[];
  inputText: string;
  isMoreData: boolean;
  lastItemRef: (node: HTMLDivElement | null) => void;
  isMoreLoading: boolean;
  handleSubmit: (e: React.FormEvent, todoText: string) => Promise<void>;
}

const SearchedList = ({
  searchedResponse,
  inputText,
  isMoreData,
  lastItemRef,
  isMoreLoading,
  handleSubmit,
}: SearchedListProps) => {
  return (
    <ListContainer>
      <ul>
        {searchedResponse.map((item, index) => (
          <SearchedItem key={index} item={item} inputText={inputText} handleSubmit={handleSubmit} />
        ))}
      </ul>
      {isMoreLoading ? (
        <LoadingContent>
          <Spinner />
        </LoadingContent>
      ) : (
        !isMoreData && <LoadingIndicator ref={lastItemRef}>...</LoadingIndicator>
      )}
    </ListContainer>
  );
};

const ListContainer = styled.div`
  z-index: 1;
  position: absolute;
  padding: 9px 5px;
  border-radius: 5px;
  width: 97%;
  height: 193px;
  border: 1px solid #dedede;

  background-color: #fff;
  box-shadow: 0 2px 4px 0 rgb(50 50 50 / 10%);

  overflow-y: scroll;
`;

const LoadingIndicator = styled.div`
  display: flex;
  justify-content: center;
`;

const LoadingContent = styled.div`
  display: flex;
  position: relative;
  height: 30px;
  justify-content: center;
  align-items: center;
  cursor: wait;
`;

export default SearchedList;
