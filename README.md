# 원티드 프리온보딩 프론트엔드 7팀 4주차 과제

<div align="center">
 
 📚 사전 과제: "Toodos"

**프로젝트 기간 :** 2023.05.14 ~ 2023.05. 17

</div>
<br />

## 목차
- [💻 로컬 설치 및 실행방법](#-로컬-설치-및-실행방법)
- [👀 코드 리뷰](#-코드-리뷰)
    - [1. style 코드를 하단으로 수정](#1-style-코드를-하단으로-수정)
    - [2 추상화 수준 맞추기](#2-추상화-수준-맞추기)
      - [2.1 trim, addtodos 함수 분리](#21-추상화-수준을-동일하게-하기-위해-trim-addtodos-함수로-분리하였습니다)
      - [2.2 removetodo 함수 분리](#22-추상화-수준을-동일하게-하기-위해-removetodo-함수로-분리하였습니다)
    - [3. 재사용성을 고려한 컴포넌트 분리](#3-재사용성을-고려한-컴포넌트의-분리)
- [🛠 기능 구현](#-기능-구현)
    - [1. inputTodo의 디자인 수정 및 dropdown 제작](#1-디자인-가이드figma를-참고해서-inputtodo의-디자인-수정-및-dropdown을-새로-만들어주세요)
    - [2. input에 debounce 적용](#2-input에-500ms로-debounce를-적용해주세요)
    - [3. dropdown 추천 아이템 무한스크롤 구현](#3-dropdown에-추천된-아이템들이-처음에-10개가-나올-수-있도록-하고-아이템이-더-있으면-무한-스크롤로-최대-10개씩-받아올-수-있도록-구현해주세요)
    - [4. dropdown 아이템 클릭 시 input value 초기화, 리스트 추가](#4-dropdown에서-아이템-하나를-선택하면-input의-value는-초기화가-되고-아이템이-리스트에-추가되도록-구현해주세요)
- [🔧 Tech Stack](#-tech-stack)
- [🏠 Toodos 구조](#-toodos-구조)


<br /><br />

## 💻 로컬 설치 및 실행방법

1. Clone this repo:

```bash
git clone ...
```

&nbsp; &nbsp; &nbsp;    .env 설정

```
REACT_APP_API_URL= {YOUR_API_URL}
REACT_APP_TOKEN = {YOUR_TOKEN}
```
2. Install dependencies & packages

```bash
npm install
```

3. Run application

```bash
npm run start
```
<br /><br />

## 👀 코드 리뷰

#### 1. style 코드를 하단으로 수정
\- 파일 내 코드 중요 순서를 고려하여 style 코드를 하단으로 수정하였습니다.

변경 전
```tsx
/* components/Header.tsx */

const Header = () => {
  const headerStyle = {
    padding: '20px 0',
    lineHeight: '1.5em',
  };
  const titleStyle: React.CSSProperties = {
    fontSize: '6rem',
    fontWeight: '600',
    marginBottom: '2rem',
    lineHeight: '1em',
    color: '#ececec',
    textAlign: 'center',
  };

  return (
    <header style={headerStyle}>
      <h1 style={titleStyle}>Toodos</h1>
    </header>
  );
};

export default Header;
```

변경 후 
```tsx
/* components/Header.tsx */

import styled from 'styled-components';

const Header = () => {
  return (
    <S.headerStyle>
      <S.titleStyle>Toodos</S.titleStyle>
    </S.headerStyle>
  );
};

export default Header;

const S = {
  headerStyle: styled.header`
    padding: 20px 0;
    line-height: 1.5em;
  `,
  titleStyle: styled.h1`
    font-size: 6rem;
    font-weight: 600;
    margin-bottom: 2rem;
    line-height: 1em;
    color: #ececec;
    text-align: center;
  `,
};
```

<br/>

#### 2. 추상화 수준 맞추기
##### 2.1 추상화 수준을 동일하게 하기 위해 trim, addTodos 함수로 분리하였습니다.
변경 전
```tsx
/* InputTodo.tsx */

//(...)

const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      try {
        e.preventDefault();
        setIsLoading(true);

        const trimmed = inputText.trim();
        if (!trimmed) {
          return alert('Please write something');
        }

        const newItem = { title: trimmed };
        const { data } = await createTodo(newItem);

        if (data) {
          return setTodos(prev => [...prev, data]);
        }
      } catch (error) {
        console.error(error);
        alert('Something went wrong.');
      } finally {
        setInputText('');
        setIsLoading(false);
      }
    },
    [inputText, setTodos]
  );
  
  //(...)
```
변경 후
```tsx
/* InputTodo.tsx */

//(...)

const trimInputText = (inputText: string) => {
    const trimmedText = inputText.trim();

    if (!trimmedText) {
      return alert('Please write something');
    } else return trimmedText;
  };

  const addTodo = async (todo: string) => {
    const newItem = { title: todo };
    const { data } = await createTodo(newItem);

    if (data) {
      return setTodos(prev => [...prev, data]);
    }
  };

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setIsLoading(true);

      const trimmedText = trimInputText(inputText);

      if (trimmedText) {
        await addTodo(trimmedText);
      }

      setInputText('');
      setIsLoading(false);
    },
    [inputText, setTodos]
  );
  
 //(...)
```
##### 2.2 추상화 수준을 동일하게 하기 위해 removeTodo 함수로 분리하였습니다.
변경 전
```tsx
/* TodoItem.tsx */

//(...)

const removeTodo = async () => {
    await deleteTodo(id);
    setTodos(prev => prev.filter((item: TodoTypes) => item.id !== id));
  };

  const handleRemoveTodo = useCallback(async () => {
    setIsLoading(true);
    await removeTodo();
    setIsLoading(false);
  }, [id, setTodos]);
  
//(...)
```
변경 후
```tsx
/* TodoItem.tsx */

//(...)

  const handleRemoveTodo = useCallback(async () => {
    try {
      setIsLoading(true);
      await deleteTodo(id);

      setTodos(prev => prev.filter((item: TodoTypes) => item.id !== id));
    } catch (error) {
      console.error(error);
      alert('Something went wrong.');
    } finally {
      setIsLoading(false);
    }
  }, [id, setTodos]);
  
//(...)
```
#### 3. 재사용성을 고려한 컴포넌트의 분리
\- 재사용성이 높은 spinner 아이콘을 component로 분리하였습니다.
```tsx
/* components/common/Spinner.tsx */

import { FaSpinner } from 'react-icons/fa';
import styled from 'styled-components';

const Spinner = () => {
  return (
    <S.Spinner>
      <FaSpinner />
    </S.Spinner>
  );
};

//(...)
```
<br/><br/>

## 🛠 기능 구현

사용자가 input에 타이핑을 하면 추천된 todo를 dropdown에 보여질 수 있도록 `InputTodo`에 추천 기능을 구현하였습니다.

#### 1. 디자인 가이드(Figma)를 참고해서 InputTodo의 디자인 수정 및 dropdown을 새로 만들어주세요.

|변경 전|변경 후|
|---|---|
|![캡처_2023_05_15_15_28_38_227](https://github.com/wanted-Team-7/pre-onboarding-10th-4-7/assets/118191378/b05f0a7d-10a1-4257-a412-db04ed900ec7)|![캡처_2023_05_15_15_28_56_421](https://github.com/wanted-Team-7/pre-onboarding-10th-4-7/assets/118191378/d8b5f134-a3d6-41c0-9084-81e2ef6bee85)|

|hover 시 border 변경|loading spinner 변경|
|---|---|
|![녹화_2023_05_15_15_25_57_960](https://github.com/wanted-Team-7/pre-onboarding-10th-4-7/assets/118191378/55ceda51-e861-43b1-a8d7-dccffd453ae1)|![녹화_2023_05_15_15_26_29_462](https://github.com/wanted-Team-7/pre-onboarding-10th-4-7/assets/118191378/6e3cdf23-99de-4e5f-9f9c-3005a742a7c6)|

<br/>

#### 2. Input에 `500ms`로 debounce를 적용해주세요.
\- useDebounce custom hook을 생성하여 debounce를 적용하였습니다.
```ts
/* hooks/useDebounce.ts */

function useDebounce(value: string, delay: number) {
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
}

export default useDebounce;



/* components/InputTodo.tsx */

const searchTerm = useDebounce(inputText, 500);

```
<br/>

#### 3. Dropdown에 추천된 아이템들이 처음에 10개가 나올 수 있도록 하고, 아이템이 더 있으면 무한 스크롤로 최대 10개씩 받아올 수 있도록 구현해주세요.

|dropdown|dropdown 하단 표시아이콘,<br /> loading spinner |
|---|---|
|![캡처_2023_05_15_15_30_45_521](https://github.com/wanted-Team-7/pre-onboarding-10th-4-7/assets/118191378/4d34c896-aa25-460d-8db3-70d3fa8fb049)|![녹화_2023_05_15_15_32_19_49](https://github.com/wanted-Team-7/pre-onboarding-10th-4-7/assets/118191378/069fac70-5672-4e02-a93b-63fd1421620b)|

<br/>

#### 4. Dropdown에서 아이템 하나를 선택하면, input의 value는 초기화가 되고 아이템이 리스트에 추가되도록 구현해주세요.
<img src="https://github.com/wanted-Team-7/pre-onboarding-10th-4-7/assets/118191378/95992193-3d9c-402e-b398-e4df274acc8b" width="50%" height="50%"/>


## 🔧 Tech Stack
![React](https://img.shields.io/badge/react-61DAFB.svg?&style=for-the-badge&logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/typescript-3178c6.svg?&style=for-the-badge&logo=typescript&logoColor=white)
![Axios](https://img.shields.io/badge/axios-5A29E4.svg?&style=for-the-badge&logo=axios&logoColor=white)
![styled-components](https://img.shields.io/badge/styledcomponents-DB7093.svg?&style=for-the-badge&logo=styledcomponents&logoColor=white)

<br/>

## 🏠 Toodos 구조
```ts
📦src
 ┣ 📂api
 ┃ ┣ 📜index.ts
 ┃ ┗ 📜todo.ts
 ┣ 📂components
 ┃ ┣ 📂common
 ┃ ┃ ┗ 📜Spinner.tsx
 ┃ ┣ 📜Header.tsx
 ┃ ┣ 📜InputTodo.tsx
 ┃ ┣ 📜RecommendList.tsx
 ┃ ┣ 📜TodoItem.tsx
 ┃ ┗ 📜TodoList.tsx
 ┣ 📂hooks
 ┃ ┣ 📜useDebounce.ts
 ┃ ┗ 📜useFocus.ts
 ┣ 📂pages
 ┃ ┗ 📜Main.tsx
 ┣ 📂types
 ┃ ┗ 📜todo.ts
 ┣ 📜App.css
 ┣ 📜App.tsx
 ┗ 📜index.tsx
```

