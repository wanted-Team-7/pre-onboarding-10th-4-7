import { FaTrash } from 'react-icons/fa';
import styled from 'styled-components';
import SpinnerIcon from './SpinnerIcon';

interface TrashIconProps {
  isDeleting: boolean;
  handleRemoveTodo: () => void;
}

const TrashIcon = ({ isDeleting, handleRemoveTodo }: TrashIconProps) => {
  return (
    <Wrapper>
      {!isDeleting ? (
        <button onClick={() => handleRemoveTodo()}>
          <Trash />
        </button>
      ) : (
        <SpinnerIcon type="remove" />
      )}
    </Wrapper>
  );
};

const Trash = styled(FaTrash)`
  color: orangered;
  font-size: 16px;

  &:hover {
    opacity: 0.5;
  }
`;

const Wrapper = styled.span`
  position: absolute;
  display: flex;
  align-items: center;
  right: 5px;
  bottom: 0;
  top: 0;

  .btn-spinner {
    animation: spin 2s linear infinite;
  }

  .btn-trash {
    color: orangered;
    font-size: 16px;
  }

  button {
    border: none;

    background-color: transparent;
    cursor: pointer;
  }
`;

export default TrashIcon;
