# 개인 과제
## 작업 : 이지윤

## 폴더 구조
```
src
├── App.css
├── App.tsx
├── api
│   ├── index.ts
│   └── todo.ts
├── components
│   ├── SearchedItem.tsx
│   └── TodoItem.tsx
├── constants
│   └── constant.ts
├── hooks
│   └── useDebounce.tsx
├── index.tsx
├── pages
│   └── Main.tsx
├── types
│   └── todo.ts
└── views
    ├── Header.tsx
    ├── Icon
    │   ├── InputTodo.tsx
    │   ├── SearchIcon.tsx
    │   ├── SpinnerIcon.tsx
    │   └── TrashIcon.tsx
    ├── SearchedList.tsx
    └── TodoList.tsx
```

## 로직, 뷰 구분
- main.tsx에서 거의 모든 기능을 담당
- 그 이후 props로 자식컴포넌트에 전달

--------
## Main.tsx
### 무한스크롤
1. 호출 트리거
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
2. 호출 제한
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

### 인풋창 변경 감지 with 디바운스
```ts
  // handleChange: 검색어 변경 시 처리 함수
  const handleChange = useCallback(async () => {
    if (!debouncedSearchQuery) {
      setSearchedResponse([]);
      setTotal(0);
      return;
    }
    const response = await searchTodo({ q: debouncedSearchQuery });
    setSearchedResponse(response.data.result);
    setTotal(response.data.total);
    setCurrentPage(1);
  }, [debouncedSearchQuery]);
```
-> 디바운스 딜레이에 맞게 리랜더링 되도록 useCallback으로 최적화

## SearchedList.tsx
```ts
const SearchedList = ({
  searchedResponse,
  inputText,
  setInputText,
  isNoMoreData,
  lastItemRef,
  isMoreLoading,
}: SearchedListProps) => {
  return (
    <ListContainer>
      <ul>
        {searchedResponse.map((item, index) => (
          <SearchedItem key={index} item={item} inputText={inputText} setInputText={setInputText} />
        ))}
      </ul>
      {isMoreLoading ? (
        <LoadingContent>
          <FaSpinner className="btn-spinner" />
        </LoadingContent>
      ) : (
        !isNoMoreData && <LoadingIndicator ref={lastItemRef}>...</LoadingIndicator>
      )}
    </ListContainer>
  );
};
```
-> 받아올 데이터의 여부에 따라 분기처리

## SearchedItem.tsx
```ts
const SearchedItem = ({ item, inputText, setInputText }: SearchedItemProps) => {
  // isSelected : 아이템이 선택되었는지 여부.
  const [isSelected, setIsSelected] = useState<boolean>(false);

  // splitItem : 검색어를 기준으로 아이템을 분리한 배열을 생성합니다.
  const splitItem = item.split(new RegExp(`(${inputText})`, 'gi'));

  // handleItemClick : 아이템을 클릭했을 때 실행되는 처리 함수.
  const handleItemClick = (event: React.MouseEvent) => {
    event.preventDefault();
    setIsSelected(!isSelected);
    setInputText(item);
  };

  return (
    <ListItem onMouseDown={handleItemClick} isSelected={isSelected}>
      <ItemContent>
        {splitItem.map((part, index) =>
          part.toLowerCase() === inputText.toLowerCase() ? (
            <HighlightedText key={index}>{part}</HighlightedText>
          ) : (
            part
          )
        )}
      </ItemContent>
    </ListItem>
  );
};
```
-> Focus를 감지하는 이벤트와(부모 컴포넌트에서) 아이템을 클릭하는 이벤트와(자식 컴포넌트에서) 겹쳐서 예기치 못한 버그발생
-> onMouseDown을 이용해서 이벤트 겹침현상을 해결함

## api/index.ts
```ts
baseInstance.interceptors.response.use(
  ({ data }) => data,
  error => {
    // 인스턴스에서 에러 처리 -> Toast message로 처리하면 좋을 거 같음.
    alert(`Error: ${error.message}`);
    return Promise.reject(error);
  }
);

const apiRequest = {
  get: (url: string, request?: AxiosRequestConfig) => baseInstance.get(url, request),
  delete: (url: string, request?: AxiosRequestConfig) => baseInstance.delete(url, request),
  post: (url: string, data: { title: string }, config?: AxiosRequestConfig) =>
    baseInstance.post(url, data, config),
};
```
-> api함수가 호출되는 부분에서 try, catch, finally를 사용해서 에러를 핸들링하는 코드의 가독성이 너무 떨어진다고 판단
-> axios interceptor에서 오류 핸들링으로 기존 api함수가 쓰이는 부분에서 async/await로 바꿈으로 가독성 향상시킴