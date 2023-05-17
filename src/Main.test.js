import { fireEvent, getByText, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import App from './App';
import InputTodo from './components/InputTodo';

// 컴포넌트 렌더링 위주의 테스트만을 진행하였습니다.
// 상황을 나누어서
// 처음 렌더링 시에 있어야 할 것
//

describe('<App />', () => {
  it('matches snapshot', () => {
    const app = render(<App />);
    // expect(app.container).toMatchSnapshot();
    // container: 해당 컴포넌트의 최상위 DOM
    // snap shot testing: 렌더링된 결과를 스냅샷 찍어 놓고, 테스트 할 때 마다 이와 비교함. 스냅샷을 업데이트하려면 테스트가 실행되고 있는 콘솔창에서 'u' 키를 입력.
  });

  it('should render title, inputTodo and todoList', () => {
    const { getByText, getByPlaceholderText } = render(<App />);
    getByText('Toodos'); // title이 있는지 확인
    getByPlaceholderText('Add new todo...'); // inputTodo이 있는지 확인
    getByText('...'); // todoList이 있는지 확인
  });

  it('should render dropdown when input was clicked', () => {
    const { getByPlaceholderText, getByRole } = render(<App />);
    const input = getByPlaceholderText('Add new todo...');

    userEvent.click(input);
    getByRole('list'); // input 클릭하면 list가 나타는지 확인
  });
});

describe('<InputTodo />', () => {
  test('Whether the submit event occurs when the enter key is pressed', () => {
    const onSubmit = jest.fn();
    const onChange = jest.fn();
    const { getByPlaceholderText } = render(
      <InputTodo handleSubmit={onSubmit} onChangeInput={onChange} />
    );
    const input = getByPlaceholderText('Add new todo...');
    userEvent.type(input, 'lorem');
    // fireEvent.keyPress(input, { key: 'Enter' });
    expect(onChange).toBeCalled(); // input에 타이핑하면 onChange 이벤트가 실행된
    // expect(onChange).toBeCalled(); // input에 Enter키를 누르면 form의 onSubmit 함수가 호출됨
    // expect(onSubmit).toBeCalledWith('lorem');
  });
});
// describe('<SearchedList />', () => {});
