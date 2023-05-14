import styled from 'styled-components';

const Header = () => {
  return (
    <TodoHeader>
      <TodoTitle>Toodos</TodoTitle>
    </TodoHeader>
  );
};

const TodoHeader = styled.header`
  padding: 20px 0;
  line-height: 1.5em;
`;

const TodoTitle = styled.h1`
  font-size: 6rem;
  font-weight: 600;
  margin-bottom: 2rem;
  line-height: 1em;
  color: #ececec;
  text-align: center;
`;

export default Header;
