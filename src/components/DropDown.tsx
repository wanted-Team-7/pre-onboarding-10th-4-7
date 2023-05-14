import React from 'react';
import styled from 'styled-components';

interface DropdownType {
  dropdownRef: React.RefObject<HTMLDivElement>;
  searchListData: string[];
}

function DropDown({ dropdownRef, searchListData }: DropdownType) {
  return (
    <DropdownBox ref={dropdownRef}>
      <DropdownList>
        {searchListData.length >= 0 &&
          searchListData.map((item, idx) => <DropdownItem key={idx}>{item}</DropdownItem>)}
      </DropdownList>
    </DropdownBox>
  );
}

export default DropDown;

const DropdownBox = styled.div`
  width: 580px;
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

const DropdownItem = styled.li`
  list-style-type: none;
  box-sizing: border-box;
  padding: 6px 12px;
`;
