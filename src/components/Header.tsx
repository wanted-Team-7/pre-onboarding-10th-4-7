import styled from 'styled-components';

const Header = () => {
  return (
    <S.headerStyle>
      <S.titleStyle>Toodos</S.titleStyle>
    </S.headerStyle>
  );
};

export default Header;

const S = {
  headerStyle: styled.header`
    padding: 20px 0;
    line-height: 1.5em;
  `,
  titleStyle: styled.h1`
    font-size: 6rem;
    font-weight: 600;
    margin-bottom: 2rem;
    line-height: 1em;
    color: #ececec;
    text-align: center;
  `,
};
