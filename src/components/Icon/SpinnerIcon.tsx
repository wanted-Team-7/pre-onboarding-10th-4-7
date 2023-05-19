import { FaSpinner } from 'react-icons/fa';
import styled, { keyframes } from 'styled-components';

// FIXME: SpinnerIcon 개선해야함 (FaSpinner가 사용되는 부분이 있음)
const SpinnerIcon = ({ type }: { type: string }) => {
  switch (type) {
    case 'scroll':
      return (
        <AlignCenter>
          <Spinner />
        </AlignCenter>
      );
    case 'remove':
      return <Spinner />;
    case 'input':
      return (
        <Wrapper>
          <Spinner />
        </Wrapper>
      );

    default:
      return null;
  }
};

const AlignCenter = styled.div`
  display: flex;
  justify-content: center;
`;

const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
  `;

const Spinner = styled(FaSpinner)`
  color: #000000;
  font-size: 20px;
  animation: ${spin} 2s linear infinite;
  display: flex;
  align-self: center;
`;

const Wrapper = styled.div`
  position: absolute;
  right: 20px;
  animation: spin 2s linear infinite;
  display: flex;
  align-self: center;
`;

export default SpinnerIcon;
