import { FaTrash } from 'react-icons/fa';
import styled from 'styled-components';

const TrashIcon = () => {
  return (
    <Icon>
      <FaTrash />
    </Icon>
  );
};

const Icon = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: orangered;
  font-size: 16px;
  &:hover {
    opacity: 0.5;
  }
`;

export default TrashIcon;
