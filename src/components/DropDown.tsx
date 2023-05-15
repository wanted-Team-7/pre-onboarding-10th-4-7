import { useRef, useEffect, useCallback, useState } from 'react';
import { S } from './style';
import { LIMIT } from '../constant';
import { getSearchList, createTodo } from '../api/todo';
import { TodoTypes } from '../types/todo';

interface DropDownProps {
  searchList: string[] | undefined;
  setSearchList: React.Dispatch<React.SetStateAction<string[]>>;
  setTodos: React.Dispatch<React.SetStateAction<TodoTypes[]>>;
  setInputText: React.Dispatch<React.SetStateAction<string>>;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  inputText: string;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
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
}: DropDownProps) => {
  const target = useRef<HTMLLIElement>(null);
  const endRef = useRef(false);
  const preventRef = useRef(true);
  const flag = useRef(true);
  const [load, setLoad] = useState<boolean>(false);

  useEffect(() => {
    //옵저버 생성
    const observer = new IntersectionObserver(obsHandler, { threshold: 1 });
    if (target.current) observer.observe(target.current);
    return () => {
      observer.disconnect();
    };
  }, []);

  // page 증가에 따른 새로운 data 불러오기
  useEffect(() => {
    getPost();
    console.log('get list', endRef.current, currentPage);
  }, [currentPage]);

  const obsHandler = (entries: any) => {
    //옵저버 콜백함수
    const test = entries[0];
    if (flag.current) {
      flag.current = false;
      return;
    }

    if (test.isIntersecting && endRef.current === false && preventRef.current === true) {
      preventRef.current = false; //옵저버 중복 실행 방지
      setCurrentPage(prev => prev + 1); //페이지 값 증가
    }
  };

  const onClickElement = async (e: any) => {
    try {
      setIsLoading(true);
      setInputText('');
      const newItem = { title: e.target.innerText };

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

  const getPost = useCallback(async () => {
    setLoad(true);
    try {
      const res = await getSearchList(inputText, currentPage, LIMIT);
      console.log(searchList?.length, currentPage);

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
      setLoad(false);
    }
  }, [currentPage]);

  return (
    <S.DropDownContainer>
      <ul>
        {searchList?.map((e: string, idx: number) => (
          <S.Li key={idx} onClick={onClickElement}>
            {e.split(inputText)[0]}
            <span style={{ color: '#2BC9BA' }}>{inputText}</span>
            {e.split(inputText)[1]}
          </S.Li>
        ))}
        {load === true ? (
          <S.SpinnerContainer style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
            <S.Spinner className="spinner" />
          </S.SpinnerContainer>
        ) : null}
        <li ref={target}>target</li>
      </ul>
    </S.DropDownContainer>
  );
};

export default DropDown;