import styled from 'styled-components';

interface SearchedItemProps {
  item: string;
  inputText: string;
  handleSubmit: (e: React.FormEvent, todoText: string) => Promise<void>;
}

const SearchedItem = ({ item, inputText, handleSubmit }: SearchedItemProps) => {
  // splitItem : 검색어를 기준으로 아이템을 분리한 배열을 생성합니다.
  const splitItem = item.split(new RegExp(`(${inputText})`, 'gi'));

  // handleItemClick : 아이템을 클릭했을 때 실행되는 처리 함수.
  const handleItemClick = (event: React.MouseEvent<HTMLLIElement>) => {
    handleSubmit(event, event.currentTarget.innerText);
  };

  return (
    <ListItem onMouseDown={handleItemClick}>
      <ItemContent>
        {splitItem.map((part, index) =>
          part.toLowerCase() === inputText.toLowerCase() ? (
            <HighlightedText key={index}>{part}</HighlightedText>
          ) : (
            part
          )
        )}
      </ItemContent>
    </ListItem>
  );
};

const ListItem = styled.li`
  padding: 5px 3px;
  list-style-type: none;
  cursor: pointer;
  overflow-x: hidden;
  width: 98%;

  white-space: nowrap;

  text-overflow: ellipsis;

  :hover {
    background-color: ${({ theme }) => theme.softGray};
  }

  :active {
    background-color: ${({ theme }) => theme.lightCyan};
  }
`;

const ItemContent = styled.span`
  padding-left: 10px;
`;

const HighlightedText = styled.span`
  font-weight: bold;
  color: ${({ theme }) => theme.cyan};
`;

export default SearchedItem;
