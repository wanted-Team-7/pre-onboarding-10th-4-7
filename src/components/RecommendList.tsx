import { useEffect, useState } from 'react';
import { getRecommendList } from '../api/todo';
import styled from 'styled-components';

interface RecommendListType {
  searchTerm: string;
  addTodo: (todo: string) => Promise<void>;
  setInputText: (inputText: string) => void;
  isVisibleRecommendList: boolean;
  setIsVisibleRecommendList: (isVisible: boolean) => void;
}

const RecommendList = ({
  searchTerm,
  addTodo,
  setInputText,
  isVisibleRecommendList,
  setIsVisibleRecommendList,
}: RecommendListType) => {
  const [recommendList, setRecommendList] = useState([]);

  const onRecommendList = async () => {
    if (searchTerm) {
      setIsVisibleRecommendList(true);
      const { data } = await getRecommendList(searchTerm);
      setRecommendList(data.result);
    }
  };

  useEffect(() => {
    onRecommendList();
  }, [searchTerm]);

  const clickDropdownItem = (event: React.MouseEvent<HTMLLIElement>) => {
    const data = event.currentTarget.innerText;
    addTodo(data);
    setInputText('');
    setIsVisibleRecommendList(false);
  };

  return (
    <S.DropdownContainer visible={isVisibleRecommendList}>
      {recommendList.map((recommendWord, index) => (
        <S.DropdownItem
          key={`recommend-${index}`}
          onClick={clickDropdownItem}
          value={recommendWord}
        >
          {recommendWord}
        </S.DropdownItem>
      ))}
    </S.DropdownContainer>
  );
};

export default RecommendList;

const S = {
  DropdownContainer: styled.ul<{ visible: boolean }>`
    z-index: 999;
    display: ${({ visible }) => (visible ? 'flex' : 'none')};
    flex-direction: column;
    align-items: flex-start;
    margin-top: 4px;
    padding: 9px 5px;

    position: absolute;
    width: 100%;
    max-width: 580px;
    height: 164px;

    background: #ffffff;
    border: 1px solid #dedede;
    box-shadow: 0px 0px 1px rgba(50, 50, 50, 0.05), 0px 2px 4px rgba(50, 50, 50, 0.1);
    border-radius: 5px;

    overflow-y: auto;
    ::-webkit-scrollbar {
      width: 4px;
    }
    ::-webkit-scrollbar-thumb {
      height: 72px;
      background: rgba(0, 0, 0, 0.48);
      border-radius: 2px;
    }
  `,
  DropdownItem: styled.li`
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    padding: 6px 12px;
    gap: 10px;

    width: 100%;
    height: 28px;
    font-size: 14px;
    background: #ffffff;
    border-radius: 3px;

    flex: none;
    order: 0;
    align-self: stretch;
    flex-grow: 0;
    :hover {
      background: #f2f2f2;
      cursor: pointer;
    }
    :active {
      background: #d5f4f1;
    }
  `,
};
