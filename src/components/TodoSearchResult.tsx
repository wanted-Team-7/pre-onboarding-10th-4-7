import styled from 'styled-components';

function TodoSearchResult() {
  return <ItemContainer>helloworldhelloworldhellowhelloworldaaaaaa...</ItemContainer>;
}

const ItemContainer = styled.div`
  /* font color #2BC9BA  */
  width: 100%;
  height: 28px;
  padding: 6px 12px;
  gap: 10px;

  display: flex;
  align-items: center;

  background-color: #ffffff;
  /* background-color: #d5f4f1; */
  border-radius: 3px;

  &:hover {
    background-color: #f2f2f2;
  }
`;

export default TodoSearchResult;
