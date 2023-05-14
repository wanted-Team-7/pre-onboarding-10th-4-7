import { FaSpinner, FaTrash } from 'react-icons/fa';
import styled from 'styled-components';

interface TrashIconProps {
  isLoading: boolean;
  handleRemoveTodo: () => void;
}

const TrashIcon = ({ isLoading, handleRemoveTodo }: TrashIconProps) => {
  return (
    <Wrapper>
      {!isLoading ? (
        <button onClick={() => handleRemoveTodo()}>
          <FaTrash className="btn-trash" />
        </button>
      ) : (
        <FaSpinner className="btn-spinner" />
      )}
    </Wrapper>
  );
};

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
    background-color: transparent;
    border: none;
    cursor: pointer;
  }
`;

export default TrashIcon;
