## 개인 과제 : 정승연

<br />

## input focus일 경우 Dropdown 구현

- isOpen `stat`값으로 드롭다운이 보이도록 구현하지 않고, `ref`를 이용해 `input`의 `onFous`, `onBlur` 조건에 따라 드롭다운이 보이게 구현했습니다.

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
const Dropdown = forwardRef<HTMLUListElement,{ data: string[]; debouncedInputText: string; isEnd: boolean }
>(({ data, debouncedInputText, isEnd }, ref: Ref<HTMLUListElement> | undefined) => {

  return (
    <StDropdownUl ref={ref}>
      ...
    </StDropdownUl>
  );
});
```

<br />

## 검색어 입력 시 Dropdown에 추천 아이템 10개씩 표시
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
const getScrollData = async () => {
    try {
      const res = await getSearchList(debouncedInputText, page);
      const scrollServerData = res.data.result;
      setData([...data, ...scrollServerData]);
      setPage(pre => pre + 1);
    } catch (error) {
      return console.log(error);
    }
};

useEffect(() => {
    getScrollData();
}, [debouncedInputText]);
```

<br />

## input 검색어 입력 시 500ms Debounce 적용

- input 입력 시 과도한 서버 요청, 처리로 발생할 수 있는 성능 저하를 막기 위해 `useDebounce` 훅을 이용해 디바운싱을 구현했습니다.

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

const getScrollData = async () => {
    try {
      const res = await getSearchList(debouncedInputText, page);
	    ...
    } catch (error) {
      return console.log(error);
    }
  };
```


<br />

## 검색어 색상 활성화

- input에 검색한 문자를 기준으로 `split`을 적용한 후, array에 map을 반복하면서 split된 부분마다 검색한 문자를 삽입해 색상을 변경했습니다.

```tsx
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
```

<br />

## Spinner 구현

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

<br />

## 무한 스크롤
작업 진행 중입니다.
