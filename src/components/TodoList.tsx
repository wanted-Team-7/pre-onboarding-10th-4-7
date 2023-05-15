import styled from 'styled-components';
import TodoItem from './TodoItem';
import { useTodoState } from '../context/TodoProvider';

const TodoList = () => {
  const { todoListData } = useTodoState();
  return todoListData.length ? (
    <ul>
      {todoListData.map(({ id, title }) => (
        <TodoItem key={id} id={id} title={title} />
      ))}
    </ul>
  ) : (
    <EmptyList>...</EmptyList>
  );
};

export default TodoList;

const EmptyList = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  font-size: 2.5rem;
  letter-spacing: 1.5rem;
  margin-left: 0.75rem;
  color: ${({ theme }) => theme.color.COLOR_GRAY_3};
`;
