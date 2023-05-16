import styled from 'styled-components';
import SearchIcon from './Icon/SearchIcon';
import SpinnerIcon from './Icon/SpinnerIcon';
import { ChangeEvent } from 'react';

interface InputTodoProps {
  isTyping: boolean;
  isLoading: boolean;
  handleSubmit: (e: React.FormEvent) => Promise<void>;
  inputText: string;
  onChangeInput: (e: ChangeEvent<HTMLInputElement>) => void;
  handleFocus: () => void;
  handleBlur: () => void;
  isFocused: boolean;
}

interface StyledFormProps {
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
}: InputTodoProps) => {
  return (
    <StyledForm onSubmit={handleSubmit} isFocused={isFocused} isTyping={isTyping}>
      <SearchIcon />
      <StyledInput
        placeholder="Add new todo..."
        value={inputText}
        onChange={onChangeInput}
        disabled={isLoading}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
      {isLoading && <SpinnerIcon />}
    </StyledForm>
  );
};

const StyledForm = styled.form<StyledFormProps>`
  display: flex;
  position: relative;
  width: 100%;
  height: 44px;
  border: 3px solid transparent;
  border-radius: 6px;
  outline: 1px solid #dedede;
  margin-bottom: 10px;
  justify-content: space-evenly;
  box-sizing: border-box;

  :hover {
    ${props =>
      !props.isFocused &&
      !props.isTyping &&
      `
    transition: 0.3s;
    border-color: #dedede;
  `}
  }
  ${props =>
    (props.isFocused || props.isTyping) &&
    `
    outline: 1px solid #000;
  `}
`;

const StyledInput = styled.input`
  width: 85%;
  padding: 0 5px;
  border: none;

  background-color: transparent;

  font-size: 1rem;
  font-weight: 400;
  outline: none;

  text-overflow: ellipsis;
`;

export default InputTodo;
