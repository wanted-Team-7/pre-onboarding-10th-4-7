## 이준용 개인과제

## 폴더 구조
```
📦src
 ┣ 📂api
 ┃ ┣ 📜index.ts
 ┃ ┗ 📜todo.ts
 ┣ 📂assets
 ┃ ┣ 📜spinner_icon.svg
 ┃ ┗ 📜union_icon.svg
 ┣ 📂components
 ┃ ┣ 📜DropDown.tsx
 ┃ ┣ 📜Header.tsx
 ┃ ┣ 📜InputTodo.tsx
 ┃ ┣ 📜TodoItem.tsx
 ┃ ┗ 📜TodoList.tsx
 ┣ 📂context
 ┃ ┣ 📜SearchProvider.tsx
 ┃ ┗ 📜TodoProvider.tsx
 ┣ 📂hooks
 ┃ ┣ 📜useDebounce.ts
 ┃ ┣ 📜useFocus.ts
 ┃ ┗ 📜useIntersectionObserver.ts
 ┣ 📂icon
 ┃ ┣ 📜PlusIcon.tsx
 ┃ ┣ 📜SpinnerIcon.tsx
 ┃ ┗ 📜TrashIcon.tsx
 ┣ 📂pages
 ┃ ┗ 📜Main.tsx
 ┣ 📂styles
 ┃ ┣ 📜globalStyle.ts
 ┃ ┗ 📜theme.ts
 ┣ 📂types
 ┃ ┣ 📜context.ts
 ┃ ┣ 📜dropdown.ts
 ┃ ┗ 📜todo.ts
 ┣ 📜App.tsx
 ┣ 📜custom.d.ts
 ┗ 📜index.tsx
```

## 기능 구현

### 드롭 다운 이벤트

```ts
const [isDropdownOpen, setIsDropdownOpen] = useState(false); // 드롭다운 상태
const { ref: inputRef, setFocus: setInputFocus } = useFocus(); // input
const dropdownRef = useRef<HTMLUListElement>(null); // dropdown
```

```ts
const handleInputClick = () => {
  setIsDropdownOpen(true);
};

useEffect(() => {
  const handleClickOutside = (event: MouseEvent) => {
    // 현재 inputRef와 dropdownRef에 값이 있는 상태이며 input, dropdown 외부 영역을 클릭 시 드롭다운 닫힘
    if (
      dropdownRef.current &&
      inputRef.current &&
      !dropdownRef.current.contains(event.target as Node) &&
      !inputRef.current.contains(event.target as Node)
    ) {
      setIsDropdownOpen(false);
    }
  };
  document.addEventListener('click', handleClickOutside);
  return () => {
    document.removeEventListener('click', handleClickOutside);
  };
}, [dropdownRef, inputRef]);
```

`handleInputClick`: 클릭 시 드롭다운됩니다.
`hadleClickOutSide` : 인풋, 드롭다운 영역 외 클릭 시 드롭다운 닫힘니다.

```ts
 {isDropdownOpen && inputText && searchListData.length > 0 && (
   <DropDown
     dropdownRef={dropdownRef}
     searchListData={searchListData}
     inputText={inputText}
     handleAddTodoClick={handleAddTodo}
   />
 )}
```

**isDropdownOpen**이 true이거나 **inputText**에 값이 있거나 **searchListData**에 검색 값이 있다면 드롭다운은 동작합니다.

### 무한 스크롤

useIntersectionObserver 커스텀 훅 구현

```ts
import { useEffect, useState } from 'react';

export interface IntersectionObserverTypes {
  root?: null;
  rootMargin?: string;
  threshold?: number;
  onIntersect: IntersectionObserverCallback;
}

const useIntersectionObserver = ({
  root,
  rootMargin = '0px',
  threshold = 0,
  onIntersect,
}: IntersectionObserverTypes) => {
  const [target, setTarget] = useState<HTMLElement | null | undefined>(null);

  useEffect(() => {
    if (!target) return;

    const observer: IntersectionObserver = new IntersectionObserver(onIntersect, {
      root,
      rootMargin,
      threshold,
    });
    observer.observe(target);

    return () => observer.unobserve(target);
  }, [onIntersect, root, rootMargin, target, threshold]);

  return { setTarget };
};

export default useIntersectionObserver;
```

**root**: 가시성을 모니터링할 요소의 루트(root) 요소이며 기본값은 null, 브라우저의 viewport가 기본값으로 사용됩니다.  
**rootMargin**: root 요소의 마진(margin)을 지정하는 문자열이며 기본값은 '0px', root 요소의 경계에 대한 여백을 나타냅니다.  
**threshold**: 가시성 이벤트가 발생하는 임계값(threshold)이며 기본값은 0, 타겟 요소가 root 요소와 교차할 때 이벤트가 발생합니다.  
**onIntersect**: 교차 이벤트 발생 시 호출될 콜백 함수(callback function)다. IntersectionObserverCallback 타입으로 정의되어 있으며, 교차 이벤트 정보를 인자로 받습니다.

**useIntersectionObserver** 훅은 위에서 정의한 인터페이스를 매개변수로 받습니다.  
내부에서는 상태 관리를 위해 useState 훅을 사용하여 **target** 상태를 생성하며 target은 가시성을 모니터링할 대상 요소를 가리킵니다.  
**useEffect** 훅을 사용하여 컴포넌트가 마운트되거나 **target** 상태가 변경될 때마다 **Intersection Observer**를 생성하고 대상 요소를 관찰(observing)합니다.  
생성된 **Observer**는 root, rootMargin, threshold 등을 옵션으로 설정하여 초기화됩니다.  
**useEffect** 훅은 컴포넌트가 언마운트될 때 해당 Observer를 해제(unobserve)합니다.

사용 방법

```ts
const onIntersect: IntersectionObserverCallback = ([{ isIntersecting }]) => {
  if (isIntersecting && !isTotal && !isSearchLoading) {
    handleSearchFetch('scroll', inputText);
  }
};
const { setTarget } = useIntersectionObserver({ onIntersect });
```
**isInersecting** 값이 true이며 **isTotal**(검색 결과를 전부 가져왔는지)이 false이며 **isSearchLoading**(로딩 중인지)이 false인 경우 무한 스크롤 이벤트 실행합니다.

```ts
<DropdownBox ref={dropdownRef}>
  {searchListData.map((item, idx) => (
    <DropdownItem key={idx} onClick={() => handleAddTodoClick(item)}>
      <HighlightedText text={item} highlight={inputText} />
    </DropdownItem>
  ))}
  {!isTotal && (
    <IntersectionBox ref={setTarget}>
      {isSearchLoading ? <Spinner className="spinner" /> : !isTotal && <Union />}
    </IntersectionBox>
  )}
</DropdownBox>
```
**setTarget**은 **Intersection Observer**를 적용할 컴포넌트에 선언해줍니다.  
검색중인 경우 스피너 아이콘을 띄어주며 검색 결과가 더 있는 경우 Union 아이콘을 띄어줍니다.

### 디바운스

useDebounce 커스텀 훅 구현

```ts
import { useEffect, useState } from 'react';

function useDebounce(value: string, delay: number) {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);
  return debouncedValue;
}

export default useDebounce;
```

### ContextAPI

로직이 많아 관심사를 분리하기 위해 **ContextAPI**를 적용하여 **TodoContext**, **SearchContext**추가

**TodoContext**
state와 event로 분리  
**state** : inputText, setInputText, todoListData, isAddLoading  
**event** : handleAddTodo, handleRemoveTodo, handleSubmit

**SearchContext**
state와 event로 분리  
**state** : isTotal, isSearchLoading, searchListData  
**event** : handleSearchFetch

`handleSearchFetch`의 경우에는 구현한거라 부연 설명하겠습니다.

```ts
const [isTotal, setIsTotal] = useState(false);  // 현재 검색 결과가 마지막 검색 결과인지 확인
const [currentPage, setCurrentPage] = useState(1); // 현재 페이지
const [isSearchLoading, setIsSearchLoading] = useState(false); // 검색 결과 로딩
const [searchListData, setSearchListData] = useState<string[]>([]); // 검색 결과
```

```ts
const handleSearchFetch = async (type: string, inputText: string) => {
  if (inputText.trim() === '') {
    setSearchListData([]);
    return;
  }
  if (type === 'first') {
    setCurrentPage(1);
    setSearchListData([]);
  }
  if (type === 'scroll') setCurrentPage(prev => prev + 1);
  setIsSearchLoading(true);
  const updateCurrentPage = type === 'scroll' ? currentPage + 1 : 1;
  const { data } = await searchTodoList({ q: inputText, page: updateCurrentPage, limit: 10 });
  setSearchListData(prev => [...prev, ...data.result]);
  setIsTotal(data.page * data.limit >= data.total);
  setIsSearchLoading(false);
};
```

**type**은 input에 검색중인지(first), 무한 스크롤 검색중인지(scroll)를 구분하며 **inputText**는 검색어입니다.  
우선 어떠한 검색 결과도 입력이 되지 않았다면 검색은 진행되지 않습니다.  
input에 검색어 입력 시(first) 현재 페이지를 1로 바꾸고 저장된 검색 결과를 초기화합니다.  
input에 검색어가 입력되어 있고 스크롤 바를 움직이는 경우 현재 페이지에서 1을 더합니다.  
하지만 **setState**에 변경된 state가 적용되는 이벤트보다 바뀐 현재페이지를 통해 다음 검색어를 검색하는 이벤트가 먼저 발생되기 때문에 바뀐 페이지 번호가 적용되지 않는 문제가 발생했습니다.  
따라서 **type**에 따라 현재 페이지나 변경된 페이지를 파라미터로 넘겨주는 **updateCurrentPage** 변수를 선언했습니다.  
그 다음은 검색한 결과를 state에 적용해주면 됩니다.
