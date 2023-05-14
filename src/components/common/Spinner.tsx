import { FaSpinner } from 'react-icons/fa';
import styled from 'styled-components';

const Spinner = () => {
  return (
    <S.Spinner>
      <FaSpinner />
    </S.Spinner>
  );
};

export default Spinner;

const S = {
  Spinner: styled.div`
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
  `,
};
