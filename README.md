# 원티드 프리온보딩 프론트엔드 7팀 4주차 과제


- **프로젝트 기간:** 2023년 5월 14일 ~ 2023년 5월 17일
- **배포링크:** https://pre-onboarding-10th-4-7.netlify.app/

<br/>

## ⚙️ 실행 방법

### 설치

```shell
git clone
npm install
npm start
```

### 환경 변수 설정

```
REACT_APP_API_URL= 'api url'
REACT_APP_TOKEN= 'token'
```


## 👨‍💻👩‍💻 팀원 목록

| 이름   | GitHub Repository                                       |
| ------ | ------------------------------------------------------ |
| 이지윤 | [@1yoouoo](https://github.com/1yoouoo)                   |
| 우상헌 | [@Withlaw](https://github.com/Withlaw)                   |
| 권민영 | [@minnyoung](https://github.com/minnyoung)               |
| 유재형 | [@JwithYOU](https://github.com/JwithYOU)                 |
| 박정도 | [@jeongdopark](https://github.com/jeongdopark)           |
| 김희진 | [@Jinnie-kim](https://github.com/Jinnie-kim)             |
| 정승연 | [@xxyeon129](https://github.com/xxyeon129)               |
| 이준용 | [@leejy001](https://github.com/leejy001)                 |



## 🚀 구현 기능 

## 1. Debounce 처리

```ts
function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
}
```

디바운스 딜레이에 맞게 리랜더링 되도록 useCallback으로 최적화

<br/>

## 2. DropDown 처리

###  Dropdown rendering 시점

- 기존) input focus 여부에 따라 dropdown 표시
- 현재) input focus 여부와 input text가 **debounce 가 동시에 만족**될 때 dropdown 표시
- 사용자 입장에서 어느 시점에 dropdown이 rendering 되면 좋을지 팀원들과 다양하게 의견을 나눌 수 있었습니다. [(pull request #21)](https://github.com/wanted-Team-7/pre-onboarding-10th-4-7/pull/21)

```tsx
/* Main.tsx */

return (
    <Container>

      {/* (...) */}

        {debouncedSearchQuery && isFocused && (
          <SearchedList
            searchedResponse={searchedResponse}
            inputText={inputText}
            isMoreData={isMoreData}
            lastItemRef={lastItemRef}
            isMoreLoading={isMoreLoading}
            handleSubmit={handleSubmit}
          />
        )}

        {/* (...) */}

    </Container>
  );

```


<br/>

## 3. 무한 스크롤

### 호출 트리거
```ts
  // lastItemRef: 마지막 항목의 ref 콜백 함수
  const lastItemRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting) {
          loadMoreData();
        }
      });
      if (node) observer.current.observe(node);
    },
    [loadMoreData]
  );
```
-> IntersectionObserver를 이용해서 마지막 Item이 감지되면 loadMoreData 호출
<br>
<br>

### 호출 제한
```ts
  useEffect(() => {
    // 검색 결과가 전체 데이터 개수와 동일하다면 더 이상 데이터가 없음
    if (searchedResponse.length === total) {
      setIsNoMoreData(true);
    } else {
      setIsNoMoreData(false);
    }
  }, [searchedResponse.length, total]);
```
-> 서버에서 전달하는 total과 현재 데이터의 개수가 같다면 더이상 호출하지 않도록 구현
<br>
<br>

## 4. 아이템 추가
[(pull request #21)](https://github.com/wanted-Team-7/pre-onboarding-10th-4-7/pull/21)
###  추천된 todo 목록 클릭 시 기존 todo 목록에 추가
- 추천된 todo 목록 클릭 시 기존 todo 목록에 추가가 되고, input에 입력했던 내용들이 초기화 될 수 있도록 하였습니다. 
- todo 등록 시 기존에 사용되던 `handleSubmit` 함수에 두번째 인자로 todoText를 받아 재사용 될 수 있도록 했습니다. 

<br/>

```tsx

/* Main.tsx */

// handleSubmit: 폼 제출 시 처리 함수
  const handleSubmit = useCallback(
    async (e: React.FormEvent, todoText: string) => {
      e.preventDefault();
      if (isLoading) return;
      // 두번째 인자인 todoText를 이용해 여러 컴포넌트에서 사용할 수 있도록 함
      const trimmed = todoText.trim(); 
      if (!trimmed) return alert('Please write something');
      setIsLoading(true);
      const newItem = { title: trimmed };
      const { data } = await createTodo(newItem);
      if (data) {
        setTodoListData(prev => [...prev, data]);
      }

      setInputText(''); // inputText 초기화 진행
      setIsLoading(false);
      setIsFocused(false);
    },
    [isLoading]
  );

```

<br/>

## 🚀 리팩토링

## 1. API Caching
[(pull request #29)](https://github.com/wanted-Team-7/pre-onboarding-10th-4-7/pull/29)

##  캐싱 구현

한번 검색된 내용을 재검색하는 경우 api를 호출해야하는데 검색된 내용을 캐시에 저장하여 같은 내용을 검색할 때 저장된 정보를 불러옴으로써 api 호출을 줄일 수 있다.

- 검색어 입력 시 검색어를 key 값으로 캐시스토리지에서 가져오고 저장하는 유틸 함수를 구현
    
    ```tsx
    export const getCache = async (key: string) => {
      const cacheStorage = await caches.open('search');
      const cacheResponse = await cacheStorage.match(key);
      if (cacheResponse) {
        const cacheData = await cacheResponse.json();
        if (cacheData.expire > new Date().getTime()) {
          return cacheData.value;
        }
        cacheStorage.delete(key);
      }
    };
    
    export const setCache = async (key: string, value: SearchDataType, expireTime: number) => {
      const cacheStorage = await caches.open('search');
      const cacheData = new Response(
        JSON.stringify({ value, expire: new Date().getTime() + expireTime })
      );
      await cacheStorage.put(key, cacheData);
    };
    ```
    
- `useSearchData` 커스텀 훅에 캐시 유무에 따라 반환되는 데이터를 다르게 하기 위해 `getSearchData`라는 함수로 로직을 따로 분리하여 구현
- 검색어와 현재 페이지를 조합한 키를 이용하여 무한 스크롤 검색 시에 나오는 검색 결과 값도 처리
    
    ```tsx
    const getSearchData = async (updateCurrentPage: number, debouncedSearchQuery: string) => {
      const cacheData = await getCache(debouncedSearchQuery + updateCurrentPage);
      if (!cacheData) {
        const { data } = await searchTodo({ q: debouncedSearchQuery, page: updateCurrentPage });
        setCache(debouncedSearchQuery + updateCurrentPage, data, 60 * 1000);
        return data;
      }
      return cacheData;
    };
    ```


## 2. Context API
[(pull request #19)](https://github.com/wanted-Team-7/pre-onboarding-10th-4-7/pull/19)

### Context로 Main 컴포넌트 내부에서 전역 상태 공유

- Main 컴포넌트의 InputTodo, DropDown, ToDoList 등 자식 컴포넌트와 다시 이들의 자식 컴포넌트에서 공통적으로 사용되는 값을 관리하는 Provider 컴포넌트를 생성하였습니다.
- 그에 따라 context에서 접근 가능한 값들에 대해 props를 정리하였습니다.
- 불필요한 렌더링을 제어하기 위해 state 등 자주 변하는 값과 setState 함수 등 변하지 않는 값을 분류하여 두 개의 context로 관리하였습니다.

<details>
<summary>Context Api Code</summary>
<div>

```ts
// contexts/TodoContext.ts
import { createContext, useContext, useEffect, useState } from 'react';
import { TodoTypes, getTodoList } from '../api/todo';

interface ITodoStateContext {
  inputText: string;
  todoListData: TodoTypes[];
}
interface ITodoDispatchContext {
  setInputText: React.Dispatch<React.SetStateAction<string>>;
  setTodoListData: React.Dispatch<React.SetStateAction<TodoTypes[]>>;
}
const TodoStateContext = createContext<ITodoStateContext | null>(null);
const TodoDispatchContext = createContext<ITodoDispatchContext | null>(null);

function TodoContextProvider({ children }: { children: React.ReactNode }) {
  const [inputText, setInputText] = useState('');
  const [todoListData, setTodoListData] = useState<TodoTypes[]>([]);

  useEffect(() => {
    // 할 일 목록 데이터 로드
    (async () => {
      const { data } = await getTodoList();
      setTodoListData(data || []);
    })();
  }, []);

  return (
    <TodoStateContext.Provider value={{ inputText, todoListData }}>
      <TodoDispatchContext.Provider value={{ setInputText, setTodoListData }}>
        {children}
      </TodoDispatchContext.Provider>
    </TodoStateContext.Provider>
  );
}

export const useTodoState = () => {
  const value = useContext(TodoStateContext);
  if (!value) throw new Error('useTodoState should be used within TodoContextProvider');
  return value;
};
export const useTodoDispatch = () => {
  const value = useContext(TodoDispatchContext);
  if (!value) throw new Error('useTodoDispatch should be used within TodoContextProvider');
  return value;
};

export default TodoContextProvider;

```

</div>
</details>

<br>

---

## 🚀 테스트 코드


##  test 코드 작성
- 중요한 DOM 요소들의 렌더링 여부와 이벤트 실행에 따른 함수 실행 여부에 대해서 테스트 코드를 작성하였습니다.
- `npm run test`을 입력하면 총 다섯가지 항목에 대해서 테스트를 실행합니다.


<details>
<summary>Test Code</summary>
<div>


```js
// Main.test.js
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
    getByText(/test/); // search data가 있으면 그 값이 렌더링되는지
  });
});

```


</div>
</details>
