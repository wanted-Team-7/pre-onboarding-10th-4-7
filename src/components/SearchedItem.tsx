import { useState } from 'react';
import styled from 'styled-components';

interface SearchedItemProps {
  item: string;
  inputText: string;
  setInputText: React.Dispatch<React.SetStateAction<string>>;
}

interface ListItemProps {
  isSelected: boolean;
}

const SearchedItem = ({ item, inputText, setInputText }: SearchedItemProps) => {
  // isSelected : 아이템이 선택되었는지 여부.
  const [isSelected, setIsSelected] = useState<boolean>(false);

  // splitItem : 검색어를 기준으로 아이템을 분리한 배열을 생성합니다.
  const splitItem = item.split(new RegExp(`(${inputText})`, 'gi'));

  // handleItemClick : 아이템을 클릭했을 때 실행되는 처리 함수.
  const handleItemClick = (event: React.MouseEvent) => {
    event.preventDefault();
    setIsSelected(!isSelected);
    setInputText(item);
  };

  return (
    <ListItem onMouseDown={handleItemClick} isSelected={isSelected}>
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

const ListItem = styled.li<ListItemProps>`
  padding: 5px 3px;
  list-style-type: none;
  cursor: pointer;
  overflow-x: hidden;
  width: 98%;

  white-space: nowrap;

  text-overflow: ellipsis;

  :hover {
    background-color: #f2f2f2;
  }

  :active {
    background-color: #d5f4f1;
  }
`;

const ItemContent = styled.span`
  padding-left: 10px;
`;

const HighlightedText = styled.span`
  font-weight: bold;
  color: #2bc9ba;
`;

export default SearchedItem;
