## 원티드 프리온보딩 4주차 과제 - 박정도
---
## 시연 GIF
![wanted-4](https://github.com/wanted-Team-7/pre-onboarding-10th-4-7/assets/72500346/ccc02307-5403-4b6c-b4ac-47daf87c8cb7)


---
<br/>

## 구현

### 📌 Input에 500ms로 debounce를 적용해주세요.

```ts

export const useDebounce = (value: string, delay: number) => {
  const [debounceValue, setDebounceValue] = useState<string>('');

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebounceValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debounceValue;
};

```
useDeounce 커스텀 훅을 생성하였습니다.


<br/>
<br/>

### 📌 무한 스크롤
1. 관찰 대상 설정
```ts
  useEffect(() => {
    const observer = new IntersectionObserver(obsHandler, { threshold: 0.5 });
    if (target.current) {
      observer.observe(target.current);
    }
    return () => {
      observer.disconnect();
    };
  }, [inputLoading]);

```
IntersectionObserver(교차 관찰자 API)를 활용하여 구현했습니다.
useEffect로 observer를 생성하고 타겟을 설정합니다. <br/>

<details>
<summary>🚨 Issue </summary>
  <div markdown="1">
  첫 렌더링 때 target을 인식하지 못하는 Issue가 있었습니다.<br/>
  InputTodo컴포넌트에서 loading이 끝마치고 observer target을 인식하기 위해서 inputLoading을 의존성으로 넣어 해결했습니다.
  </div>
</details>

<br/>

2. 콜백 함수

```ts
  const obsHandler = (entries: any) => {
    if (entries[0].isIntersecting && endRef.current === false && preventRef.current === true) {
      preventRef.current = false;
      setCurrentPage(prev => prev + 1);
      getDataScroll();
    }
  };
```
데이터를 받아오는 함수를 실행시키기 위한 조건으로는
1. 관찰 대상이 화면에 설정한 비율만큼 교차될 경우
2. 더 받아올 데이터가 있을 경우 ( endRef.current )
3. 중복 실행 방지 ( preventRef.current )
<br/>

세 가지 조건에 충족할 경우 getDataScroll() 함수를 통해 데이터를 불러옵니다.

<details>
<summary>🚨 Issue </summary>
  <div markdown="1">
  스크롤을 빠르게 내리면 콜백함수가 두 번 실행되는 issue가 있었습니다.<br/>
방지하기 위해 preventRef 변수를 설정하여 해결했습니다. 
  </div>
</details>

<br/>

3. 종료
```ts
  const getDataScroll = async () => {
    try {
      const res = await getSearchList(inputText, currentPage, PER_PAGE_LIMIT_COUNT);
      setSearchList(prev => [...prev, ...res.result]);
      if (res.total === searchList?.length && searchList?.length !== 0) {
        endRef.current = true;
      } else {
        endRef.current = false;
      }
      preventRef.current = true;
    }
  };
```

서버에서 모든 데이터를 받아왔을 경우, endRef 변수를 통해서 호출을 제한했습니다.

<br/>
 
 ## DropDown 컴포넌트

 ```ts
  if (searchList?.length === 0) {
    return (
      <S.DropDownContainer>
        <NoResult />
      </S.DropDownContainer>
    );
  }

  return (
    <S.DropDownContainer>
      <ul>
        {searchList?.map((str: string, idx: number) => (
          <S.Li key={idx} onClick={handleAddTodoElement}>
            {str.split(inputText)[0]}
            <S.Highlight>{inputText}</S.Highlight>
            {str.split(inputText)[1]}
          </S.Li>
        ))}
        {isLoading ? <Spinner /> : <Dot />}

        <S.ObserveTarget ref={target}></S.ObserveTarget>
      </ul>
    </S.DropDownContainer>
  );
};
 ```
서버에서 불러온 데이터가 빈 배열일 경우 NoResult component 반환하고
Spinner, Dot 등 컴포넌트를 분리하여 가독성을 높였습니다.

<br/>

## 문자열 줄임

```ts
export const ellipsis = (str: string, limit: number) => {
  if (str.length > limit) return str.substr(0, limit - 2) + '...';
  else return str;
};

```
적용 ⬇️
```ts

<S.TodoElement>
      <span>{ellipsis(title, LIMIT_STR_LENGTH)}</span>
      <div>
        {!isLoading ? (
          <button onClick={() => handleRemoveTodo()}>
            <S.Trash />
          </button>
        ) : (
          <S.Spinner />
        )}
      </div>
    </S.TodoElement>
```
문자열 줄임 함수를 구현하여 사용하였습니다.


---
 


## 🏠  구조

```javascript
src
 ┣ api
 ┃  ┗ index.js
 ┃  ┗ todo.js
 ┣ components
 ┃  ┣ Header.tsx
 ┃  ┣ DropDown.tsx
 ┃  ┣ Header.tsx
 ┃  ┣ InputTodo.tsx
 ┃  ┣ Spinner.tsx
 ┃  ┣ TodoItem.tsx
 ┃  ┣ TodoList.tsx
 ┃  ┗ style.ts
 ┣ hooks
 ┃  ┗ useDebounce.js
 ┣ pages
 ┃  ┣ Main.tsx
 ┃  ┗ style.ts
 ┣ types
 ┃  ┣ Props.ts
 ┃  ┗ todo.ts
 ┣ util
 ┃  ┣ constant.ts
 ┃  ┗ eillpsis.ts
 ┣ App.tsx
 ┣ GlobalStyle.ts
 ┗ index.js

```

<br/>