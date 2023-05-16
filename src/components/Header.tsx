import styled from 'styled-components';

const Header = () => {
  return (
    <HeaderStyle>
      <TitleStyle>Toodos</TitleStyle>
    </HeaderStyle>
  );
};

export default Header;

const HeaderStyle = styled.header`
  padding: 20px 0;
  line-height: 1.5em;
`;

const TitleStyle = styled.h1`
  font-size: 6rem;
  font-weight: 600;
  margin-bottom: 2rem;
  line-height: 1em;
  color: #ececec;
  text-align: center;
`;
