import { Ref, forwardRef } from 'react';
import styled from 'styled-components';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';

const Dropdown = forwardRef<
  HTMLUListElement,
  { data: string[]; debouncedInputText: string; isEnd: boolean }
>(({ data, debouncedInputText, isEnd }, ref: Ref<HTMLUListElement> | undefined) => {
  // console.log('Dropdown rendering');

  return (
    <StDropdownUl ref={ref}>
      {data?.map((item, index) => {
        const searchWordArray = item.split(debouncedInputText);
        return (
          <StDropdownLi key={index}>
            {searchWordArray.map((item, index) => (
              <span key={index}>
                {item}
                {index !== searchWordArray.length - 1 && (
                  <StSearchText>{debouncedInputText}</StSearchText>
                )}
              </span>
            ))}
          </StDropdownLi>
        );
      })}
      {isEnd && (
        <StSpinnerContainer>
          <AiOutlineLoading3Quarters className="spinner" />
        </StSpinnerContainer>
      )}
      {data.length === 0 && <StTextNoResult>No Result</StTextNoResult>}
    </StDropdownUl>
  );
});

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
`;

const StSearchText = styled.span`
  color: #2bc9ba;
`;

const StTextNoResult = styled.div`
  padding: 6px 20px;
  margin: 0 4px;
  color: #c6c6c6;
`;

const StSpinnerContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 8px;
  .spinner {
    color: #4b4b4b;
    animation: spin 1s infinite linear;
  }
`;

export default Dropdown;
