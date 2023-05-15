import styled, { keyframes } from 'styled-components';
import { FaSpinner, FaTrash } from 'react-icons/fa';

const Header = styled.header`
  padding: 20px 0;
  line-height: 1.5em;
`;

const Title = styled.h1`
  font-size: 6rem;
  font-weight: 600;
  margin-bottom: 2rem;
  line-height: 1em;
  color: #ececec;
  text-align: center;
`;

const TodoElement = styled.li`
  list-style-type: none;
  padding: 17px 1.5rem;
  border-bottom: 1px solid #eaeaea;
  font-size: 1.2rem;
  letter-spacing: 1.5px;

  div {
    float: right;

    button {
      background-color: transparent;
      border: none;
      cursor: pointer;
    }
  }

  &:hover {
    opacity: 0.85;
    background-color: #eaeaea;
  }
`;

const Li = styled.li`
  /* padding: 6px 12px; */
  color: #000000;
  &:hover {
    background-color: #f2f2f2;
    cursor: default;
  }
`;

const DropDownContainer = styled.div`
  top: 370px;
  /* padding: 10px; */
  position: absolute;
  width: 97%;
  height: 200px;
  overflow-y: scroll;

  box-shadow: 0 1px 6px 0 rgba(0, 0, 0, 0.38);
  color: #dedede;
  ul {
    list-style: none;
  }
`;

const InputForm = styled.form`
  width: 100%;
  margin-bottom: 20px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  border: 1px solid #dedede;
  border-radius: 6px;

  &:hover {
    border: 3px solid #dedede;
  }
`;

const Input = styled.input`
  height: 45px;
  outline: none;
  border: none;
  font-size: 1rem;
  font-weight: 400;
  width: 85%;
  padding-right: 5px;
  padding-left: 10px;
  border-radius: calc(0.5 * 100px);
  background-color: transparent;
`;

const Trash = styled(FaTrash)`
  color: orangered;
  font-size: 16px;
  &:hover {
    opacity: 0.5;
  }
`;
const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
  `;

const SpinnerContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const Spinner = styled(FaSpinner)`
  color: #000000;
  font-size: 20px;
  animation: ${spin} 2s linear infinite;
  display: flex;
  align-self: center;
`;

const Empty = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  font-size: 2.5rem;
  letter-spacing: 1.5rem;
  margin-left: 0.75rem;
  color: #ececec;
`;
export const S = {
  Li,
  DropDownContainer,
  Header,
  Title,
  TodoElement,
  InputForm,
  Input,
  Trash,
  Spinner,
  Empty,
  SpinnerContainer,
};
