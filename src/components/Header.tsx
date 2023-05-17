import styled from 'styled-components';

const Header = () => {
  return (
    <StyledHeader>
      <H1>Toodos</H1>
    </StyledHeader>
  );
};

const StyledHeader = styled.header`
  padding: 20px 0;
  line-height: 1.5em;
`;

const H1 = styled.h1`
  margin-bottom: 2rem;

  font-size: 6rem;
  font-weight: 600;
  line-height: 1em;

  color: ${({ theme }) => theme.lightGray};
  text-align: center;
`;

export default Header;
