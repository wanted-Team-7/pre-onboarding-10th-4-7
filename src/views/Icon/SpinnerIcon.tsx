import { FaSpinner } from 'react-icons/fa';
import styled from 'styled-components';

const SpinnerIcon = () => {
  return (
    <Wrapper>
      <FaSpinner />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: absolute;
  right: 20px;
  animation: spin 2s linear infinite;
  display: flex;
  align-self: center;
`;

export default SpinnerIcon;
