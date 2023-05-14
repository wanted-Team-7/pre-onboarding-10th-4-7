import { useState } from 'react';
import styled from 'styled-components';

interface SearchedItemProps {
  item: string;
  inputText: string;
  setInputText: React.Dispatch<React.SetStateAction<string>>;
}

interface LiProps {
  isClicked: boolean;
}

const SearchedItem = ({ item, inputText, setInputText }: SearchedItemProps) => {
  const [isClicked, setIsClicked] = useState(false);
  const splitItem = item.split(new RegExp(`(${inputText})`, 'gi'));

  const handleClick = (event: React.MouseEvent) => {
    event.preventDefault();
    setIsClicked(!isClicked);
    setInputText(item); // 클릭 이벤트 발생시 inputText 업데이트
  };

  return (
    <Li onMouseDown={handleClick} isClicked={isClicked}>
      <Content>
        {splitItem.map((part, index) =>
          part.toLowerCase() === inputText.toLowerCase() ? (
            <HilightText key={index}>{part}</HilightText>
          ) : (
            part
          )
        )}
      </Content>
    </Li>
  );
};

const Li = styled.li<LiProps>`
  padding: 5px 3px;
  list-style-type: none;
  cursor: pointer;

  :hover {
    background-color: #f2f2f2;
  }
  :active {
    background-color: #2bc9ba;
  }
`;

const Content = styled.span`
  padding-left: 10px;
`;

const HilightText = styled.span`
  font-weight: bold;
  color: #2bc9ba;
`;
export default SearchedItem;
