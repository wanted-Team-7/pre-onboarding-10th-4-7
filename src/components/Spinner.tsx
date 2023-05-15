import { S } from './style';

const Spinner = () => {
  return (
    <S.SpinnerContainer style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
      <S.Spinner />
    </S.SpinnerContainer>
  );
};

export default Spinner;
