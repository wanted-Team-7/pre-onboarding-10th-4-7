import styled from 'styled-components';
import SearchedItem from '../components/SearchedItem';
import { FaSpinner } from 'react-icons/fa';

interface SearchedListProps {
  searchedResponse: string[];
  inputText: string;
  setInputText: React.Dispatch<React.SetStateAction<string>>;
  isNoMoreData: boolean;
  lastItemRef: (node: HTMLDivElement | null) => void;
  isMoreLoading: boolean;
}

const SearchedList = ({
  searchedResponse,
  inputText,
  setInputText,
  isNoMoreData,
  lastItemRef,
  isMoreLoading,
}: SearchedListProps) => {
  return (
    <ListContainer>
      <ul>
        {searchedResponse.map((item, index) => (
          <SearchedItem key={index} item={item} inputText={inputText} setInputText={setInputText} />
        ))}
      </ul>
      {isMoreLoading ? (
        <LoadingContent>
          <FaSpinner className="btn-spinner" />
        </LoadingContent>
      ) : (
        !isNoMoreData && <LoadingIndicator ref={lastItemRef}>...</LoadingIndicator>
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
  background-color: #fff;
  border: 1px solid #dedede;
  box-shadow: 0 2px 4px 0 rgba(50, 50, 50, 0.1);
  overflow-y: scroll;
`;

const LoadingIndicator = styled.div`
  display: flex;
  justify-content: center;
`;

const LoadingContent = styled.div`
  position: relative;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: wait;
  .btn-spinner {
    animation: spin 2s linear infinite;
  }
`;

export default SearchedList;
