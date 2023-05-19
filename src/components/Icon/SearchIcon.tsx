import { FaSearch } from 'react-icons/fa';
import styled from 'styled-components';

const SearchIcon = () => {
  return (
    <Wrapper>
      <FaSearch id="search-icon" />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: absolute;
  left: 20px;
  display: flex;
  align-self: center;

  #search-icon {
    fill: ${({ theme }) => theme.darkGray};
  }
`;

export default SearchIcon;
