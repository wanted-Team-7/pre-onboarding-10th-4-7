import { useRef, useEffect } from 'react';
import { S } from './style';
import { PER_PAGE_LIMIT_COUNT } from '../util/constant';
import { getSearchList, createTodo } from '../api/todo';
import { DropDownProps } from '../types/Props';
import Spinner from './Spinner';
import Dot from './Dot';

const DropDown = ({
  searchList,
  setSearchList,
  currentPage,
  setCurrentPage,
  inputText,
  setTodos,
  setInputText,
  setIsLoading,
  isLoading,
  inputLoading,
}: DropDownProps) => {
  const target = useRef<HTMLLIElement>(null);
  const endRef = useRef(false);
  const preventRef = useRef(true);
  const flag = useRef(true);

  // IntersectionObserver 옵저버 생성
  useEffect(() => {
    const observer = new IntersectionObserver(obsHandler, { threshold: 0.5 });
    if (target.current) {
      observer.observe(target.current);
    }
    return () => {
      observer.disconnect();
    };
    // input loading이 끝마치고 observer target을 인식하기 위해서 inputLoading을 의존성으로 넣음
  }, [inputLoading]);

  //옵저버 콜백함수
  const obsHandler = (entries: any) => {
    if (entries[0].isIntersecting && endRef.current === false && preventRef.current === true) {
      preventRef.current = false; //옵저버 중복 실행 방지
      setCurrentPage(prev => prev + 1); //페이지 값 증가
      getDataScroll();
    }
  };

  // SearchList element click event
  const handleAddTodoElement = async (e: React.MouseEvent<HTMLLIElement>) => {
    try {
      setIsLoading(true);
      setInputText('');
      const newItem = { title: e.currentTarget.textContent! };
      const { data } = await createTodo(newItem);
      if (data) {
        setTodos(prev => [...prev, data]);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  // get search list api function
  const getDataScroll = async () => {
    try {
      setIsLoading(true);
      const res = await getSearchList(inputText, currentPage, PER_PAGE_LIMIT_COUNT);
      setSearchList(prev => [...prev, ...res.result]);
      if (res.total === searchList?.length && searchList?.length !== 0) {
        // 모든 데이터를 받아왔을 경우, 무한 스크롤 종료 flag 설정
        endRef.current = true;
      } else {
        endRef.current = false;
      }
      preventRef.current = true; //옵저버 중복 실행 방지
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const NoResult = () => {
    return <span>검색어 없음</span>;
  };

  // search 데이터가 없을 경우 NoResult component 반환
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

export default DropDown;
