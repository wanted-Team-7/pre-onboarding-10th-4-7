import styled from 'styled-components';
import SearchedItem from '../components/SearchedItem';
import SpinnerIcon from './Icon/SpinnerIcon';
import { BiDotsHorizontalRounded } from 'react-icons/bi';
interface SearchedListProps {
  searchedResponse: string[];
  inputText: string;
  isMoreData: boolean;
  lastItemRef: (node: HTMLDivElement | null) => void;
  isMoreLoading: boolean;
  isSearchLoading: boolean;
  handleSubmit: (e: React.FormEvent, todoText: string) => Promise<void>;
}

const SearchedList = ({
  searchedResponse,
  inputText,
  isMoreData,
  lastItemRef,
  isMoreLoading,
  isSearchLoading,
  handleSubmit,
}: SearchedListProps) => {
  if (searchedResponse.length === 0)
    return (
      <ListContainer>
        <TextContainer>
          <span>No Result</span>
        </TextContainer>
      </ListContainer>
    );
  return (
    <ListContainer>
      <ul>
        {searchedResponse.map((item, index) => (
          <SearchedItem key={index} item={item} inputText={inputText} handleSubmit={handleSubmit} />
        ))}
      </ul>
      {isSearchLoading ? null : isMoreLoading ? (
        <SpinnerIcon type={'scroll'} />
      ) : !isMoreData ? null : (
        <AlignCenter ref={lastItemRef}>
          <Dot />
        </AlignCenter>
      )}
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

const TextContainer = styled.div`
  display: flex;
  height: 100%;
  justify-content: center;
  align-items: center;

  span {
    font-size: 1.7rem;
    color: #ececec;
  }
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

export default SearchedList;
