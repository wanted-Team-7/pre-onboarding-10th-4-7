# 개인 과제 (7팀 김희진)

## 1. 폴더 구조
```
📦src
 ┣ 📂api
 ┃ ┣ 📜index.ts
 ┃ ┗ 📜todo.ts
 ┣ 📂components
 ┃ ┣ 📜Header.tsx
 ┃ ┣ 📜InputTodo.styled.ts
 ┃ ┣ 📜InputTodo.tsx
 ┃ ┣ 📜SearchList.styled.ts
 ┃ ┣ 📜SearchList.tsx
 ┃ ┣ 📜SearchListItem.tsx
 ┃ ┣ 📜TodoItem.tsx
 ┃ ┗ 📜TodoList.tsx
 ┣ 📂hooks
 ┃ ┗ 📜userFocus.ts
 ┣ 📂pages
 ┃ ┗ 📜Main.tsx
 ┣ 📂types
 ┃ ┗ todo.ts
 ┣ 📜App.css
 ┣ 📜App.tsx
 ┗ 📜index.tsx
```


## 1) 검색어 하이라이트
---
```tsx
const SearchListItem = ({ searchKeyword, isFocus, inputText }: SearchListItemTyep) => {
  const focusRef = useRef<HTMLLIElement>(null);
  useEffect(() => {
    focusRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
  }, [isFocus]);

  return (
    <SearchItem isFocus={isFocus} ref={focusRef}>
      {searchKeyword.split(inputText)[0]}
      <span>{inputText}</span>
      {searchKeyword.split(inputText)[1]}
    </SearchItem>
  );
};
```
Todo 키워드를 입력했을 때, 연관 검색어로 검색된 리스트에서 Todo 키워드를 하이라이트 했습니다.
<br />
split 메서드를 사용하여 Todo 키워드를 기준으로 분리하였고, Todo 키워드만 span 태그로 처리하여 폰트 컬러 하이라이트 처리를 했습니다.

<br />

## 2) Debounce
---
```tsx
 useEffect(() => {
    const debounceTimer = setTimeout(() => {
      getSearchKeywordHandler(inputText);
    }, 500);

    return () => clearTimeout(debounceTimer);
  }, [inputText]);
```
Todo 키워드가 입력될 때 마다 api 요청을 보내지 않도록 디바운싱 처리를 했습니다.ㅑ

<br />

## 3) Todo 키워드 입력 시 추천 키워드 10개씩 표시
```ts
interface SearchKeywordType {
  keyword: string;
  page: number;
}

export const searchTodoKeyword = async ({ keyword, page }: SearchKeywordType) => {
  try {
    const response = await apiRequest.get(`${RESOURCE_SEARCH}?q=${keyword}&page=${page}&limit=10`);

    return response;
  } catch (error) {
    throw new Error('API searchTodoKeyword error');
  }
};
```
기존에 작성되어있던 api 호출 함수 코드 구조대로 Todo 키워드로 추천 키워드를 검색하는 api 요청 함수를 작성했습니다.


## 4) 무한 스크롤 구현
---

구현 중입니다.