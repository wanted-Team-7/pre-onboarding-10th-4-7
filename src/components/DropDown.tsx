import React from 'react';
import styled from 'styled-components';
import { DropdownType, HighlightType } from '../types/dropdown';
import { ReactComponent as Union } from '../assets/union_icon.svg';
import { ReactComponent as Spinner } from '../assets/spinner_icon.svg';
import useIntersectionObserver from '../hooks/useIntersectionObserver';
import { useSearchDispatch, useSearchState } from '../context/SearchProvider';

function HighlightedText({ text, highlight }: HighlightType) {
  const parts = text.split(highlight);

  return (
    <Text>
      {parts.map((part, index) => (
        <React.Fragment key={index}>
          {part}
          {index !== parts.length - 1 && <Highlight>{highlight}</Highlight>}
        </React.Fragment>
      ))}
    </Text>
  );
}

function DropDown({ dropdownRef, searchListData, inputText, handleAddTodoClick }: DropdownType) {
  const { isTotal, isSearchLoading } = useSearchState();
  const { handleSearchFetch } = useSearchDispatch();

  const onIntersect: IntersectionObserverCallback = ([{ isIntersecting }]) => {
    if (isIntersecting && !isTotal && !isSearchLoading) {
      handleSearchFetch('scroll', inputText);
    }
  };
  const { setTarget } = useIntersectionObserver({ onIntersect });

  return (
    <DropdownBox ref={dropdownRef}>
      {searchListData.map((item, idx) => (
        <DropdownItem key={idx} onClick={() => handleAddTodoClick(item)}>
          <HighlightedText text={item} highlight={inputText} />
        </DropdownItem>
      ))}
      <IntersectionBox ref={setTarget}>
        {isSearchLoading ? (
          <Spinner className="spinner" />
        ) : !isTotal ? (
          <Union className="union" />
        ) : null}
      </IntersectionBox>
    </DropdownBox>
  );
}

export default DropDown;

const DropdownBox = styled.ul`
  width: 580px;
  margin-top: -16px;
  min-height: 28px;
  max-height: 164px;
  position: absolute;
  z-index: 100;
  padding: 9px 5px 0px 5px;
  box-sizing: border-box;
  background-color: ${({ theme }) => theme.color.COLOR_WHITE};
  border: 1px solid ${({ theme }) => theme.color.COLOR_GRAY_4};
  border-radius: 5px;
  box-shadow: 0px 0px 1px rgba(50, 50, 50, 0.05), 0px 2px 4px rgba(50, 50, 50, 0.1);
  overflow-y: scroll;
  ::-webkit-scrollbar {
    width: 10px;
    padding-right: 2px;
  }
  ::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background-color: rgba(0, 0, 0, 0.48);
    background-clip: padding-box;
    border: 2px solid ${({ theme }) => theme.color.COLOR_NONE};
  }
`;

const DropdownItem = styled.li`
  list-style-type: none;
  box-sizing: border-box;
  cursor: pointer;
  padding: 6px 12px;
  border-radius: 3px;
  :hover {
    background: ${({ theme }) => theme.color.COLOR_GRAY_1};
  }
  :active {
    background: ${({ theme }) => theme.color.COLOR_MINT_1};
  }
`;

const IntersectionBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .spinner {
    height: 29px;
    animation: spin 0.8s infinite ease-in-out;
  }
  .union {
    height: 29px;
  }
  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

const Text = styled.p`
  font-size: 14px;
  font-weight: 400;
  letter-spacing: 0.02em;
  line-height: 20px;
`;

const Highlight = styled.span`
  color: ${({ theme }) => theme.color.COLOR_MINT_2};
`;
