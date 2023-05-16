import styled from 'styled-components';
import { getRecommendedKeywords } from '../api/todo';
import { useEffect, useState } from 'react';
// import RecommendedListItem from './RecomendedListItem';

interface RecomendedListType {
  searchText: string;
}

const RecomendedList = ({ searchText }: RecomendedListType) => {
  const [recomendedList, setRecomendedList] = useState<string[]>([]);
  const showRecomendedList = async () => {
    if (searchText.length > 0) {
      const { data } = await getRecommendedKeywords(searchText, 1);
      setRecomendedList(data.result);
    } else if (searchText.length === 0) {
      setRecomendedList([]);
    }
  };

  useEffect(() => {
    showRecomendedList();
  }, [searchText]);

  return (
    <DropdownUl>
      {recomendedList.map((recomendedText: string, idx) => (
        <DropdownLi key={idx} value={recomendedText}>
          {recomendedText.split(' ').map((text, idx) => {
            if (text === searchText) {
              return <HiliteText key={idx}>{text}</HiliteText>;
            }
            if (text.includes(searchText)) {
              return (
                <span>
                  {text.slice(0, text.indexOf(searchText))}
                  <HiliteText key={idx}>
                    {text.slice(
                      text.indexOf(searchText),
                      text.indexOf(searchText) + searchText.length
                    )}
                  </HiliteText>
                  {text.slice(text.indexOf(searchText) + searchText.length)}
                </span>
              );
            } else return <>{text}</>;
          })}
        </DropdownLi>
      ))}
    </DropdownUl>
  );
};

export default RecomendedList;

const DropdownUl = styled.ul`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 9px 5px;
  position: absolute;
  width: 364px;
  max-height: 164px;
  left: 587px;
  top: 399px;
  background: #ffffff;
  border: 1px solid #dedede;
  box-shadow: 0px 0px 1px rgba(50, 50, 50, 0.05), 0px 2px 4px rgba(50, 50, 50, 0.1);
  border-radius: 5px;
  overflow-y: auto;
`;

const DropdownLi = styled.li`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 6px 12px;
  gap: 10px;
  width: 100%;
  height: 28px;
  background: #ffffff;
  border-radius: 3px;
  flex: none;
  order: 0;
  align-self: stretch;
  flex-grow: 0;

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  &:hover {
    background-color: #f2f2f2;
  }
  &:active {
    background-color: #d5f4f1;
  }
`;

const HiliteText = styled.span`
  color: #2bc9ba;
`;
