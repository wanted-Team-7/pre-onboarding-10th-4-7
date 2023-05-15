import styled from 'styled-components';

export const SearchListBox = styled.ul`
  position: absolute;
  width: 580px;
  height: 164px;
  padding: 9px 5px;
  border: 1px solid #dedede;
  border-radius: 5px;
  background-color: #ffffff;
  overflow-y: auto;
  list-style: none;
  &::-webkit-scrollbar {
    width: 4px;
    height: 72px;
  }
  &::-webkit-scrollbar-thumb {
    background: rgba(0, 0, 0, 0.48);
    border-radius: 4px;
  }
  > li + li {
    margin-top: 12px;
  }
`;
