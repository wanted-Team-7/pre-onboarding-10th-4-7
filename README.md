# 개인 과제 - 정승연
## 폴더 구조
```
📂 src
├──📂 api
│   ├── 📄 index.ts          
│   └── 📄 todo.ts           # getSearchList 함수 추가
├──📂 components
│   ├── 📄 Dropdown.tsx      # 검색어 작성 시 Dropdown되는 컴포넌트
│   ├── 📄 Header.tsx
│   ├── 📄 InputTodo.tsx     # input css 변경, 디바운스 적용, Dropdown 관련 검색어 추천 로직 추가
│   ├── 📄 TodoItem.tsx
│   └── 📄 TodoList.tsx
├──📂 hooks
│   ├── 📄 useFocus.tsx
│   └── 📄 useDebounce.ts.   # input 입력 시 디바운스 적용 훅
├──📂 layout
│   └── 📄 GeneralLayout.tsx
├──📂 pages
│   └── 📄 Main.tsx
└──📂 types
    └── 📄 todos.ts
```
## 1️⃣ input focus일 경우 Dropdown 구현

- stat값으로 드롭다운이 보이도록 구현하지 않고, `ref`를 이용해 `input`의 `onFous`, `onBlur` 조건에 따라 드롭다운이 보이게 구현해서 렌더링을 줄였습니다.

```tsx
const { ref, setFocus } = useFocus();

const handleFocus = () => {
    if (dropdownRef.current) {
      dropdownRef.current.style.display = 'block';
    }
  };

const handleBlur = () => {
    if (dropdownRef.current) {
      dropdownRef.current.style.display = 'none';
    }
};
```

```tsx
<StInput
  ref={ref}
  onFocus={handleFocus}
  onBlur={handleBlur}
/>
<Dropdown
  ref={dropdownRef}
  data={data}
  debouncedInputText={debouncedInputText}
  isEnd={isEnd}
/>
```

```tsx
const Dropdown = forwardRef<
  HTMLDivElement,
  {
    data: string[];
    debouncedInputText: string;
    getScrollData: () => Promise<void>;
    isScrollDataLoading: boolean;
  }
>(
  (
    { data, debouncedInputText, getScrollData, isScrollDataLoading },
    ref: Ref<HTMLDivElement> | undefined
  ) => {

return (
  <StDropdownUl ref={ref}>
      // ...
  </StDropdownUl>
  );
});
```

<br />

## 2️⃣ 검색어 입력 시 Dropdown에 추천 아이템 10개씩 표시
- 기존 api 관련 코드 템플릿을 유지해 서버 데이터를 가져와 표시했습니다.

```tsx
// api/todos.ts
export const getSearchList = async (inputValue: string, page: number) => {
  try {
    const response = await apiRequest.get(`search?q=${inputValue}&page=${page}&limit=10`);
    return response;
  } catch (error) {
    throw new Error('API getSearchList error');
  }
};
```

```tsx
// InputTodo.tsx
const getTypingData = async () => {
  try {
    const res = await getSearchList(debouncedInputText, page);
    const serverData = res.data.result;
    setData(serverData);
  } catch (error) {
    return console.log(error);
  }
};

useEffect(() => {
  getTypingData();
}, [debouncedInputText]);
```

<br />

## 3️⃣ input 검색어 입력 시 500ms Debounce 적용

- input 입력 시 과도한 서버 요청, 처리로 발생할 수 있는 성능 저하를 막기 위해 `useDebounce` 훅을 이용해 500ms 디바운싱을 구현했습니다.

```tsx
// useDebounce.ts
import { useEffect, useState } from 'react';

export default function useDebounce(value: string, delay: number) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(timerId);
    };
  }, [value]);

  return debouncedValue;
}
```

```tsx
// InputTodo.tsx
const [inputText, setInputText] = useState('');
const debouncedInputText = useDebounce(inputText, 500);

const getTypingData = async () => {
  try {
    const res = await getSearchList(debouncedInputText, page);
    // ...
  } catch (error) {
    // ...
  }
};
```
<br />

## 4️⃣ 무한 스크롤 구현
- IntersectionObserver API를 사용해 무한스크롤을 구현했습니다.
> The Intersection Observer API provides a way to asynchronously observe changes in the intersection of a target element with an ancestor element or with a top-level document's viewport.
MDN
- IntersectionObserver API를 사용한 이유
  - Scroll Event으로 무한 스크롤을 구현할 경우 스크롤을 진행하는 순간마다 이벤트가 호출되어 API에 데이터를 요청하는 작업이 동반되어 메모리 낭비가 일어나 throttle을 따로 적용해줘야 하는 리소스가 생깁니다.
  - Scroll Event를 사용해서 무한 스크롤을 구현할 때 구하는 offsetTop 값을 구할 때 는 정확한 값을 구하기 위해서 매번 layout을 새로 그리는데 이 Reflow 과정을 하지 않습니다.
  - target element가 화면에 노출되었는지 여부를 Scroll Event를 사용하는 것보다 간단하게 확인할 수 있습니다.
```tsx
// InputTodo.tsx
const [isScrollDataLoading, setIsScrollDataLoading] = useState(false);
const [page, setPage] = useState(1);

const getScrollData = async () => {
  try {
    if (data.length === 0) return;
    setIsScrollDataLoading(true);
    setPage(pre => pre + 1);
    const res = await getSearchList(debouncedInputText, page);
    const scrollServerData = res.data.result;
    setData([...data, ...scrollServerData]);
    setIsScrollDataLoading(false);
  } catch (error) {
    // ...
  }

<Dropdown
  // ...
  getScrollData={getScrollData}
  isScrollDataLoading={isScrollDataLoading}
 />
```
```tsx
// Dropdown.tsx
const observer = useRef<IntersectionObserver | null>(null);

const ElementRef: (node: HTMLDivElement | null) => void = useCallback(
  node => {
    if (observer.current) observer.current.disconnect(); // 최근 observer를 갖기위해 이전 observer disconnect 해주기
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        getScrollData();
      }
    });

    if (node) observer.current.observe(node); // 노드가 있으면 observer.current를 observe 해준다.
  },
  [getScrollData]
);

// ...
{isScrollDataLoading ? (
    <StSpinnerContainer>
     <AiOutlineLoading3Quarters className="spinner" />
    </StSpinnerContainer>
  ) : (
    <StScrollObserveDiv ref={ElementRef} />
)}
```


<br />

## 5️⃣ 검색어 색상 활성화

- input에 검색한 문자를 기준으로 `split`을 적용한 후, array에 map을 반복하면서 split된 부분마다 검색한 문자를 삽입해 색상을 변경했습니다.

```tsx
<StDropdownUl>
  {data?.map((item, index) => {
    const searchWordArray = item.split(debouncedInputText);
    return (
      <StDropdownLi key={index}>
        {searchWordArray.map((item, index) => (
          <span key={index}>
            {item}
            {index !== searchWordArray.length - 1 && (
              <StSearchText>{debouncedInputText}</StSearchText>
            )}
          </span>
        ))}
      </StDropdownLi>
    );
  })}
  // ...
</StDropdownUl>;

})}
```

<br />

## 6️⃣ Spinner 구현

- 기존 템플릿 구현 방식을 따라 react-icons를 적용해 input과 Dropdown에 구현했습니다.

```tsx
import { AiOutlineLoading3Quarters } from 'react-icons/ai';

<StSpinnerContainer>
  <AiOutlineLoading3Quarters className="spinner" />
</StSpinnerContainer>

const StSpinnerContainer = styled.div`
  .spinner {
    animation: spin 1s infinite linear;
}
`;
```
