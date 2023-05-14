import React from 'react';
import styled from 'styled-components';
import useIntersectionObserver from '../hooks/useIntersectionObserver';

interface DropdownType {
  dropdownRef: React.RefObject<HTMLDivElement>;
  searchListData: string[];
  isSearchLoading: boolean;
  isTotal: boolean;
  handleSearchFetch: (type: string) => void;
}

function DropDown({
  dropdownRef,
  searchListData,
  isSearchLoading,
  isTotal,
  handleSearchFetch,
}: DropdownType) {
  const onIntersect: IntersectionObserverCallback = ([{ isIntersecting }]) => {
    if (isIntersecting && !isTotal && !isSearchLoading) {
      handleSearchFetch('scroll');
    }
  };
  const { setTarget } = useIntersectionObserver({ onIntersect });

  return (
    <DropdownBox ref={dropdownRef}>
      <DropdownList>
        {searchListData.length === 0 ? (
          <Typing>검색 결과 없음</Typing>
        ) : (
          searchListData.map((item, idx) => <DropdownItem key={idx}>{item}</DropdownItem>)
        )}
        {searchListData.length > 0 && (
          <div ref={setTarget}>{isSearchLoading ? <p>loading...</p> : !isTotal && <p>...</p>}</div>
        )}
      </DropdownList>
    </DropdownBox>
  );
}

export default DropDown;

const DropdownBox = styled.div`
  width: 580px;
  margin-top: -16px;
  min-height: 28px;
  max-height: 164px;
  position: absolute;
  z-index: 100;
  padding: 9px 5px 0px 5px;
  box-sizing: border-box;
  background-color: #fff;
  border: 1px solid #dedede;
  border-radius: 5px;
  box-shadow: 0px 0px 1px rgba(50, 50, 50, 0.05), 0px 2px 4px rgba(50, 50, 50, 0.1);
  overflow-y: scroll;
  ::-webkit-scrollbar {
    width: 5px;
  }
  ::-webkit-scrollbar-thumb {
    border-radius: 2px;
    background-color: rgba(0, 0, 0, 0.48);
  }
`;

const DropdownList = styled.ul``;

const Typing = styled.p`
  box-sizing: border-box;
  padding: 6px 12px;
`;

const DropdownItem = styled.li`
  list-style-type: none;
  box-sizing: border-box;
  padding: 6px 12px;
`;
