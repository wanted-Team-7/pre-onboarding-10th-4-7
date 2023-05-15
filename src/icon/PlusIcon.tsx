import { FaPlusCircle } from 'react-icons/fa';
import styled from 'styled-components';

const PlusIcon = () => {
  return (
    <Icon>
      <FaPlusCircle />
    </Icon>
  );
};

const Icon = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: darkcyan;
  font-size: 20px;
  &:hover {
    opacity: 0.5;
  }
`;

export default PlusIcon;
