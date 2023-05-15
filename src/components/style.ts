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
  &:hover {
    background-color: aqua;
    cursor: default;
  }
`;

const DropDownContainer = styled.div`
  position: absolute;
  width: 100%;
  height: 200px;
  overflow-y: scroll;
  background-color: aquamarine;
`;

const InputForm = styled.form`
  width: 100%;
  margin-bottom: 20px;
  display: flex;
  border-radius: calc(0.5 * 100px);
  box-shadow: 0 1px 6px 0 rgba(0, 0, 0, 0.38);
  justify-content: space-evenly;
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

const Spinner = styled(FaSpinner)`
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
};
