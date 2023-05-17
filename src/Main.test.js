import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import App from './App';

// 컴포넌트 렌더링 위주의 테스트만을 진행하였습니다.
// 상황을 나누어서
// 처음 렌더링 시에 있어야 할 것
//

describe('<App />', () => {
  it('matches snapshot', () => {
    const app = render(<App />);
    screen.debug();
    expect(app.container).toMatchSnapshot();
    // container: 해당 컴포넌트의 최상위 DOM
    // snap shot testing: 렌더링된 결과를 스냅샷 찍어 놓고, 테스트 할 때 마다 이와 비교함. 스냅샷을 업데이트하려면 테스트가 실행되고 있는 콘솔창에서 'u' 키를 입력
  });
});
