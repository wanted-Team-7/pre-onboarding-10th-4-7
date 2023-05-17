## refactoring
### 1. 추천된 todo 목록 클릭 시 기존 todo 목록에 추가
- 추천된 todo 목록 클릭 시 기존 todo 목록에 추가가 되고, input에 입력했던 내용들이 초기화 될 수 있도록 하였습니다. 
- todo 등록 시 기존에 사용되던 `handleSubmit` 함수에 두번째 인자로 todoText를 받아 재사용 될 수 있도록 했습니다. 


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

### 2. Dropdown rendering 시점
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