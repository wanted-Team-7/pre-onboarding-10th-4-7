import { FaSpinner } from 'react-icons/fa';
import styled from 'styled-components';

const SearchIcon = () => {
  return (
    <Icon>
      <FaSpinner />
    </Icon>
  );
};

const Icon = styled.div`
  font-size: 20px;
  animation: spin 2s linear infinite;
  display: flex;
  align-self: center;
  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

export default SearchIcon;
