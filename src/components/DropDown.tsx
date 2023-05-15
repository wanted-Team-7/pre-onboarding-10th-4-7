import { useRef, useEffect, useCallback } from 'react';
import { S } from './style';
import { PER_PAGE_LIMIT_COUNT } from '../util/constant';
import { getSearchList, createTodo } from '../api/todo';
import { TodoTypes } from '../types/todo';
import { BiDotsHorizontalRounded } from 'react-icons/bi';

interface DropDownProps {
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setSearchList: React.Dispatch<React.SetStateAction<string[]>>;
  setTodos: React.Dispatch<React.SetStateAction<TodoTypes[]>>;
  setInputText: React.Dispatch<React.SetStateAction<string>>;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  searchList: string[] | undefined;
  isLoading: boolean;
  currentPage: number;
  inputText: string;
  inputLoading: boolean;
}

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
    if (flag.current) {
      flag.current = false;
      return;
    }

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
  const getDataScroll = useCallback(async () => {
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
  }, [currentPage]);

  return (
    <S.DropDownContainer>
      {searchList?.length === 0 ? (
        <span>검색어 없음</span>
      ) : (
        <ul>
          {searchList?.map((e: string, idx: number) => (
            <S.Li key={idx} onClick={handleAddTodoElement}>
              {e.split(inputText)[0]}
              <span style={{ color: '#2BC9BA' }}>{inputText}</span>
              {e.split(inputText)[1]}
            </S.Li>
          ))}
          {isLoading ? (
            <S.SpinnerContainer
              style={{ width: '100%', display: 'flex', justifyContent: 'center' }}
            >
              <S.Spinner />
            </S.SpinnerContainer>
          ) : (
            <li style={{ display: 'flex', justifyContent: 'center' }}>
              <BiDotsHorizontalRounded style={{ color: 'black' }} />
            </li>
          )}

          <li ref={target} style={{ display: 'flex', justifyContent: 'center' }}></li>
        </ul>
      )}
    </S.DropDownContainer>
  );
};

export default DropDown;
