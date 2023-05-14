import styled from 'styled-components';
import SearchIcon from './SearchIcon';
import SpinnerIcon from './SpinnerIcon';
import { ChangeEvent } from 'react';

interface InputTodoType {
  isTyping: boolean;
  isLoading: boolean;
  handleSubmit: (e: React.FormEvent) => Promise<void>;
  inputText: string;
  onChangeInput: (e: ChangeEvent<HTMLInputElement>) => void;
  handleFocus: () => void;
  handleBlur: () => void;
  isFocused: boolean;
}

interface WrapperType {
  isFocused: boolean;
  isTyping: boolean;
}

const InputTodo = ({
  isTyping,
  isLoading,
  handleSubmit,
  inputText,
  onChangeInput,
  handleFocus,
  handleBlur,
  isFocused,
}: InputTodoType) => {
  return (
    <Wrapper onSubmit={handleSubmit} isFocused={isFocused} isTyping={isTyping}>
      <SearchIcon />
      <Input
        placeholder="Add new todo..."
        value={inputText}
        onChange={e => onChangeInput(e)}
        disabled={isLoading}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
      {isLoading && <SpinnerIcon />}
    </Wrapper>
  );
};

const Wrapper = styled.form<WrapperType>`
  position: relative;
  width: 100%;
  height: 44px;
  margin-bottom: 10px;
  display: flex;
  border: 3px solid transparent;
  outline: 1px solid #dedede;
  border-radius: 6px;
  justify-content: space-evenly;
  box-sizing: border-box;

  :hover {
    ${props =>
      !props.isFocused &&
      !props.isTyping &&
      `
    border-color: #dedede;
  `}
  }
  ${props =>
    (props.isFocused || props.isTyping) &&
    `
    outline: 1px solid #000;
  `}
`;

const Input = styled.input`
  font-size: 1rem;
  font-weight: 400;
  width: 85%;
  padding: 0 5px;
  outline: none;
  border: none;
  background-color: transparent;
  text-overflow: ellipsis;
`;

export default InputTodo;
