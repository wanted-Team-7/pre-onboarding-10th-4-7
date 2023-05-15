import { Ref, forwardRef } from 'react';
import styled from 'styled-components';

const Dropdown = forwardRef<HTMLUListElement, { data: string[] }>(
  ({ data }, ref: Ref<HTMLUListElement> | undefined) => {
    // console.log('Dropdown rendering');

    return (
      <StDropdownUl ref={ref}>
        {data?.map((item, index) => (
          <StDropdownLi key={index}>{item}</StDropdownLi>
        ))}
        {data.length === 0 && <StTextNoResult>No Result</StTextNoResult>}
      </StDropdownUl>
    );
  }
);

const StDropdownUl = styled.ul`
  border-radius: 6px;
  border: 1px solid #dedede;
  background-color: white;
  overflow: auto;

  width: 580px;
  min-height: 100px;
  height: 200px;
  top: 46%;

  margin-top: 8px;
  padding: 20px 0;
  box-shadow: rgba(30, 32, 37, 0.1) 0px 2px 10px;
  position: absolute;
`;

const StDropdownLi = styled.div`
  padding: 6px 20px;
  margin: 0 4px;
  text-overflow: ellipsis;
  border-radius: 3px;
  cursor: pointer;
  &:hover {
    background-color: #f2f2f2;
  }
  :focus {
    background-color: #2bc9ba;
  }
`;

const StTextNoResult = styled.div`
  padding: 6px 20px;
  margin: 0 4px;
  color: #c6c6c6;
`;

export default Dropdown;
