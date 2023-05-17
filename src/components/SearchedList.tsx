import styled from 'styled-components';
import SearchedItem from '../components/SearchedItem';

import { BiDotsHorizontalRounded } from 'react-icons/bi';
import { Spinner } from './Icon/TrashIcon';

interface SearchedListProps {
  searchedResponse: string[];
  inputText: string;
  setInputText: React.Dispatch<React.SetStateAction<string>>;
  isNoMoreData: boolean;
  lastItemRef: (node: HTMLDivElement | null) => void;
  isMoreLoading: boolean;
  isLoading: boolean;
}

const SearchedList = ({
  searchedResponse,
  inputText,
  setInputText,
  isNoMoreData,
  lastItemRef,
  isMoreLoading,
  isLoading,
}: SearchedListProps) => {
  if (searchedResponse.length === 0)
    return (
      <ListContainer>
        <AlignCenter>검색어 없음</AlignCenter>
      </ListContainer>
    );
  return (
    <ListContainer>
      <ul>
        {searchedResponse.map((item, index) => (
          <SearchedItem key={index} item={item} inputText={inputText} setInputText={setInputText} />
        ))}
      </ul>

      {isLoading ? null : isMoreLoading ? (
        <AlignCenter>
          <Spinner />
        </AlignCenter>
      ) : isNoMoreData ? null : (
        <Dot />
      )}

      <div ref={lastItemRef}></div>
    </ListContainer>
  );
};

const Dot = styled(BiDotsHorizontalRounded)`
  color: black;
`;

const AlignCenter = styled.div`
  display: flex;
  justify-content: center;
`;

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

const LoadingContent = styled.li`
  display: flex;
  position: relative;
  height: 30px;
  justify-content: center;
  align-items: center;
  cursor: wait;
`;

export default SearchedList;
