import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import App from './App';
import InputTodo from './components/InputTodo';
import SearchedList from './components/SearchedList';

describe('<App />', () => {
  /*
  it('matches snapshot', () => {
    const app = render(<App />);
    expect(app.container).toMatchSnapshot();
    // container: 해당 컴포넌트의 최상위 DOM
    // snap shot testing: 렌더링된 결과를 스냅샷 찍어 놓고, 테스트 할 때 마다 이와 비교함. 스냅샷을 업데이트하려면 테스트가 실행되고 있는 콘솔창에서 'u' 키를 입력.
  });
  */

  it('should render title, inputTodo and todoList', () => {
    const { getByText, getByPlaceholderText } = render(<App />);
    getByText('Toodos'); // title이 있는지
    getByPlaceholderText('Add new todo...'); // inputTodo이 있는지
    getByText('...'); // todoList이 있는지
  });
});

describe('<InputTodo />', () => {
  test('The onChange handler function is called when the input is typed.', () => {
    const onChange = jest.fn();
    const { getByPlaceholderText } = render(
      <InputTodo onChangeInput={onChange} inputText={'test'} />
    );
    const input = getByPlaceholderText('Add new todo...');
    userEvent.type(input, 'test');
    expect(onChange).toBeCalled(); // input에 타이핑하면 onChange 이벤트가 실행되는지
  });

  test('A form submit occurs when the input submit ', () => {
    const onSubmit = jest.fn();
    const { getByPlaceholderText } = render(
      <InputTodo handleSubmit={onSubmit} inputText={'test'} />
    );
    const input = getByPlaceholderText('Add new todo...');
    fireEvent.submit(input);
    expect(onSubmit).toBeCalled(); // input이 submit하면 onSubmit 함수가 실행되는지
  });
});

describe('<SearchedList />', () => {
  test('"No Result" is rendered when there are no searchedResponse.', () => {
    const { getByText } = render(<SearchedList searchedResponse={[]} />);
    getByText('No Result'); // search data가 없으면 No Result가 렌더링되는지
  });

  test('"test" is rendered when searchedResponse is "test".', () => {
    const { getByText } = render(<SearchedList searchedResponse={['test']} inputText={'test'} />);
    getByText(/test/); // search data가 있으면 그 값이 렌더링되늕;
  });
});
