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
      </StDropdownUl>
    );
  }
);

const StDropdownUl = styled.ul`
  border-radius: 6px;
  border: 1px solid #dedede;
  background-color: white;

  width: 580px;
  top: 46%;

  margin-top: 8px;
  padding: 20px 0;
  box-shadow: rgba(30, 32, 37, 0.1) 0px 2px 10px;
  position: absolute;
`;

const StDropdownLi = styled.div``;

export default Dropdown;
