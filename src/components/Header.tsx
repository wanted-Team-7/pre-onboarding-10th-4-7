import styled from 'styled-components';

const Header = () => {
  return (
    <HeaderLogo>
      <LogoText>Toodos</LogoText>
    </HeaderLogo>
  );
};

export default Header;

const HeaderLogo = styled.header`
  padding: 20px 0;
  line-height: 1.5em;
`;

const LogoText = styled.h1`
  font-size: 6rem;
  font-weight: 600;
  margin-bottom: 2rem;
  line-height: 1em;
  color: ${({ theme }) => theme.color.COLOR_GRAY_3};
  text-align: center;
`;
