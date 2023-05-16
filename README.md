# 기업 과제: 유재형(7팀)

## 🏠 Toodos 구조

`Toodos` 앱의 폴더 구조입니다. 

```javascript
src
 ┣ api
 ┃  ┗ index.ts
 ┃  ┗ todo.ts
 ┣ components
 ┃  ┣ Header.tsx
 ┃  ┣ InputTodo.tsx
 ┃  ┣ TodoItem.tsx
 ┃  ┣ RecomendedList.tsx
 ┃  ┗ TodoList.tsx
 ┣ hooks
 ┃  ┣ useFocus.ts
 ┃  ┗ useDebounce.ts
 ┣ pages
 ┃  ┗ Main.tsx
 ┣ App.css
 ┣ App.tsx
 ┗ index.tsx

```

<br/>

---

<br/>

## 🛠 기능 구현

### 1️⃣ 추천 검색어 기능

검색어를 입력하면 추천 검색어가 나타나는 기능을 합니다.

```js
<DropdownUl>
      {recomendedList.map((recomendedText: string, idx) => (
        <DropdownLi key={idx} value={recomendedText}>
          {recomendedText.split(' ').map((text, idx) => {
            if (text === searchText) {
              return <HiliteText key={idx}>{text}</HiliteText>;
            }
            if (text.includes(searchText)) {
              return (
                <span>
                  {text.slice(0, text.indexOf(searchText))}
                  <HiliteText key={idx}>
                    {text.slice(
                      text.indexOf(searchText),
                      text.indexOf(searchText) + searchText.length
                    )}
                  </HiliteText>
                  {text.slice(text.indexOf(searchText) + searchText.length)}
                </span>
              );
            } else return <>{text}</>;
          })}
        </DropdownLi>
      ))}
    </DropdownUl>
```

----

### 2️⃣ useDebounce

정해진 시간이 되면 값을 리턴하는 함수입니다.

```js
const useDebounce = (value: string, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
};
```
---

<br/>

## 💻 로컬 설치 및 실행방법

1. Clone this repo:

```bash
git clone ...
```

2. Install dependencies & packages

```bash
npm install
```

3. Run application

```bash
npm run start
```
