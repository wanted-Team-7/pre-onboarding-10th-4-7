import { FaSpinner } from 'react-icons/fa';
import styled from 'styled-components';

// FIXME: SpinnerIcon 개선해야함 (FaSpinner가 사용되는 부분이 있음)
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
