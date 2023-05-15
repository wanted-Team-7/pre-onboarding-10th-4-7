import { Ref, forwardRef } from 'react';
import styled from 'styled-components';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { useRef, useCallback } from 'react';

const Dropdown = forwardRef<
  HTMLDivElement,
  {
    data: string[];
    debouncedInputText: string;
    getScrollData: () => Promise<void>;
    isScrollDataLoading: boolean;
  }
>(
  (
    { data, debouncedInputText, getScrollData, isScrollDataLoading },
    ref: Ref<HTMLDivElement> | undefined
  ) => {
    const observer = useRef<IntersectionObserver | null>(null);

    const ElementRef: (node: HTMLDivElement | null) => void = useCallback(
      node => {
        if (observer.current) observer.current.disconnect(); // 최근 observer를 갖기위해 이전 observer disconnect 해주기
        observer.current = new IntersectionObserver(entries => {
          if (entries[0].isIntersecting) {
            getScrollData();
          }
        });

        if (node) observer.current.observe(node); // 노드가 있으면 observer.current를 observe 해준다.
      },
      [getScrollData]
    );

    return (
      <StDropdownContainer ref={ref}>
        <StDropdownUl>
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
          {isScrollDataLoading ? (
            <StSpinnerContainer>
              <AiOutlineLoading3Quarters className="spinner" />
            </StSpinnerContainer>
          ) : (
            <StScrollObserveDiv ref={ElementRef} />
          )}

          {data.length === 0 && <StTextNoResult>No Result</StTextNoResult>}
        </StDropdownUl>
      </StDropdownContainer>
    );
  }
);

const StDropdownContainer = styled.div``;

const StDropdownUl = styled.ul`
  border-radius: 6px;
  border: 1px solid #dedede;
  background-color: white;
  overflow: auto;

  width: 580px;
  min-height: 50px;
  max-height: 200px;
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

const StScrollObserveDiv = styled.div``;

export default Dropdown;
