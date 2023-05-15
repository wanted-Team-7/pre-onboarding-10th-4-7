## 우상헌 개인 작업

> 배포링크: https://pre-onboarding-10th-4-7-withlaw.netlify.app/

## 구현기능
### 1. debounce
```ts
// useDebounce
import { useRef } from 'react';

export default function useDebounce(delay = 500) {
  const timerId = useRef<null | number>(null);

  const debounce = (callback: () => void) => {
    if (typeof timerId.current === 'number') {
      clearTimeout(timerId.current);
      timerId.current = null;
    }

    timerId.current = window.setTimeout(callback, delay);
  };

  return debounce;
}
```
1. useEffect로 디바운스를 처리하기엔 부담이 좀 큰 것 같아서 useRef를 활용하여 디바운스 훅을 만들었습니다.
2. 이 훅은 다음과 같은 동작을 하는 debounce 함수를 반환합니다.
3. 동작을 시작하면 timerId에 setTimeout값이 저장되고, 재실행 될 때마다 이전 값을 clear하고 새로운 time값을 저장합니다.
4. 지정한 delay 시간이 지나면 debounce 함수에 전달된 콜백함수가 실행됩니다. ('값'이 아닌 '동작'을 디바운스 합니다)
5. 훅의 매개변수인 delay의 초깃값 500은 timeout 시간 값으로 이해하기에 어려움이 없어보여 변수화하지 않았습니다.


```ts
// InputTodo
  //...
  const searchApiDebounce = useDebounce();
  
  const fetchSearchResults = useCallback(async (query: string) => {
    try {
      const data = query === '' ? { result: [] } : await getSearchTodos(query);
      setSearchResults(data.result);
      setCurrentPage(FIRST_PAGE);
    } catch (error) {
      console.error('Fetch error! ', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setInputText(value);
    setIsLoading(true);
    searchApiDebounce(() => fetchSearchResults(value));
  };
```
1. useDebounce()를 실행하여 디바운스를 가져옵니다. => searchApiDebounce
2. 디바운스할 함수 fetchSearchResults를 정의한 후 필요한 곳에서 디바운스를 실행합니다. => searchApiDebounce(() => fetchSearchResults(value));
3. 함수 fetchSearchResults는 최초 한번만 선언되도록 메모이징 처리를 하였습니다.

<br />

### 2. infinite scroll
```ts
// useObserve
import { useCallback, useEffect, useRef } from 'react';

export default function useObserve<T extends HTMLElement>(
  callback: () => void,
  options?: IntersectionObserverInit
) {
  const observerTarget = useRef<T>(null);

  const obsCallback = useCallback(
    (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        callback();
      });
    },
    [callback]
  );

  useEffect(() => {
    const observer = new IntersectionObserver(obsCallback, options);
    observer.observe(observerTarget.current as Element);
    return () => {
      observer.disconnect();
    };
  }, [obsCallback, options]);

  return { observerTarget };
}
```
1. 위와 같이 무한스크롤 동작을 트리거할 옵저버를 설정하는 useObserve 훅을 만들었습니다.
2. 훅은 옵저버가 활성화될 때 실행할 콜백함수와 옵저버 설정 값을 인자로 받고, 옵저빙할 요소에 부착하는 ref를 반환합니다.


```tsx
// TodoDropDown
  const HandleIntersect = useCallback(() => {
    setCurrentPage(prev => prev + 1);
  }, []);
  const { observerTarget } = useObserve<HTMLDivElement>(HandleIntersect, {
    root: null,
    threshold: 1,
  });
  // ...
  
  return(
   //...
    <DotsIcon ref={observerTarget} isHidden={searchResults.length === 0 || isLoading || isHidden}>
      ...
    </DotsIcon>
  ) 
```
1. `<DotsIcon />`가 화면에 전부 나타나면 HandleIntersect가 실행되도록 구현하였습니다.
2. HandleIntersect 함수는 페이지 state를 다음 페이지로 변경합니다.
 
 
```ts
// InputTodo
   //...
   useEffect(() => {
    if (currentPage === 1) return;
    (async () => {
      try {
        setIsLoading(true);
        const data = await getSearchTodos(inputText, currentPage);
        setSearchResults(prevResult => [...prevResult, ...data.result]);
        if (Math.ceil(data.total / data.limit) === currentPage) {
          setIsHidden(true);
        }
      } catch (error) {
        console.error('Infinite fetch error! ', error);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [currentPage]);
```
1. useEffect의 의존성에 페이지 state인 currentPage를 지정하였습니다.
2. 페이지 변경이 일어나면 getSearchTodos(inputText, currentPage)를 호출하여 다음 페이지 데이터를 받아옵니다.
3. 처음 페이지에서는 useEffect가 실행되지 않도록 설정하였습니다.


```ts
export const getSearchTodos = async (
  query: string,
  page = FIRST_PAGE,
  limit = RESULTS_PER_PAGE
) => {
  try {
    const response = await baseInstance.get<IData>('/search', {
      params: {
        q: query,
        page,
        limit,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error('API getSearchTodos error');
  }
};
```
1. 디바운스에서도 사용한 getSearchTodos는 위와 같이 구현하였습니다.
2. 요청할 데이터 page와 데이터 개수는 인자로 전달할 수 있고, 기본값을 1페이지와 10개로 설정하였습니다.
3. apiRequest를 사용하지 않고 baseInstance를 사용하였는데, 추후에 리팩토링할 예정입니다.


### 3. Dropdown 아이템 클릭시 리스트에 추가
1. 설명할게 없어서 넘기겠습니다...

### 4. DropDown
1. 아이템마다 검색어와 동일한 문자열은 다른 스타일을 적용함
2. 아이템 호버 및 클릭시 다른 스타일을 적용함
3. loading spinner
4. 



