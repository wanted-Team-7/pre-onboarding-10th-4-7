import styled from 'styled-components';
import SearchedItem from '../components/SearchedItem';
import { FaSpinner } from 'react-icons/fa';

interface SearchedListProps {
  searchedResponse: string[];
  isMoreData: boolean;
  lastItemRef: (node: HTMLDivElement | null) => void;
  isMoreLoading: boolean;
}

const SearchedList = ({
  searchedResponse,
  isMoreData,
  lastItemRef,
  isMoreLoading,
}: SearchedListProps) => {
  return (
    <ListContainer>
      <ul>
        {searchedResponse.map((item, index) => (
          <SearchedItem key={index} item={item} />
        ))}
      </ul>
      {isMoreLoading ? (
        <LoadingContent>
          <FaSpinner className="btn-spinner" />
        </LoadingContent>
      ) : (
        isMoreData && <LoadingIndicator ref={lastItemRef}>...</LoadingIndicator>
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

  .btn-spinner {
    animation: spin 2s linear infinite;
  }
`;

export default SearchedList;
