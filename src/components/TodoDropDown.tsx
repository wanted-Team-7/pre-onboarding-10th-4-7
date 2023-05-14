import styled from 'styled-components';
import TodoSearchResult from './TodoSearchResult';
import { ImSpinner8 } from 'react-icons/im';
import { useEffect, useRef } from 'react';

interface ITodoDropDown {
  searchResults: string[];
}

function TodoDropDown({ searchResults }: ITodoDropDown) {
  const observerTarget = useRef<HTMLDivElement>(null);

  // observe
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        const [entry] = entries;
        if (!entry.isIntersecting) return;
        console.log('oberseve: ', entry);
      },
      {
        root: null,
        threshold: 1,
      }
    );
    observer.observe(observerTarget.current as Element);
    return () => observer.disconnect();
  }, []);

  return (
    <DropDownItemContainer>
      {searchResults.length === 0 ? (
        <TodoSearchResultNone>검색어가 없습니다.</TodoSearchResultNone>
      ) : (
        searchResults?.map((searchResult, idx) => (
          <TodoSearchResult key={idx} value={searchResult} />
        ))
      )}

      <DotsIcon ref={observerTarget} isHidden>
        ...
      </DotsIcon>
      {/* <SpinIcon>
        <ImSpinner8 />
      </SpinIcon> */}
      {/* <SpinIcon /> */}
    </DropDownItemContainer>
  );
}

const DropDownItemContainer = styled.div`
  margin-top: 2px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 9px 5px;

  width: 364px;
  max-height: 164px;

  /* Neutral/White */

  background: #ffffff;
  /* Neutral/300 */

  border: 1px solid #dedede;
  /* Shadow/Light/40% */

  box-shadow: 0px 0px 1px rgba(50, 50, 50, 0.05), 0px 2px 4px rgba(50, 50, 50, 0.1);
  border-radius: 5px;

  overflow: auto;
`;
const DotsIcon = styled.div<{ isHidden: boolean }>`
  ${props =>
    props.isHidden &&
    `
      display: none;
    `}

  color: #9f9f9f;
  width: 100%;
  height: 28px;
  padding: 6px 12px;
  gap: 10px;

  font-size: 14px;
  text-align: center;
`;

const SpinIcon = styled(ImSpinner8)`
  color: #9f9f9f;
  font-size: 14px;

  display: flex;
  align-self: center;

  animation: spin 2s linear infinite;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

const TodoSearchResultNone = styled.div`
  width: 100%;
  height: 28px;
  padding: 6px 12px;
  gap: 10px;

  display: flex;
  align-items: center;

  background-color: #ffffff;
  border-radius: 3px;

  white-space: nowrap;
`;

export default TodoDropDown;
