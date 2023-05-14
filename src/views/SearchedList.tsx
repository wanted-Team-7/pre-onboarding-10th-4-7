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
    <Container>
      <ul>
        {searchedResponse.map((item: string, index: number) => (
          <SearchedItem key={index} item={item} inputText={inputText} setInputText={setInputText} />
        ))}
      </ul>
      {isMoreLoading ? (
        <Content>
          <FaSpinner className="btn-spinner" />
        </Content>
      ) : (
        !isNoMoreData && <HiddenData ref={lastItemRef}>...</HiddenData>
      )}
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

const HiddenData = styled.div`
  display: flex;
  justify-content: center;
`;

const Content = styled.div`
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
