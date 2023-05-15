import { useRef, useEffect, useCallback, useState } from 'react';
import { FaSpinner } from 'react-icons/fa';
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
  setDropdownDisplay: React.Dispatch<React.SetStateAction<boolean>>;
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
  setDropdownDisplay,
  setIsLoading,
}: DropDownProps) => {
  const target = useRef<HTMLLIElement>(null);
  const endRef = useRef(false);
  const preventRef = useRef(true);
  const [load, setLoad] = useState<boolean>(false);

  useEffect(() => {
    //옵저버 생성
    const observer = new IntersectionObserver(obsHandler, { threshold: 0.5 });
    if (target.current) observer.observe(target.current);
    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    getPost();
    console.log('get list', endRef.current);
  }, [currentPage]);

  const obsHandler = (entries: any) => {
    //옵저버 콜백함수
    const test = entries[0];
    console.log(endRef.current);

    if (test.isIntersecting && endRef.current === false) {
      //옵저버 중복 실행 방지)
      preventRef.current = false; //옵저버 중복 실행 방지
      console.log('observe');
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
      setSearchList(prev => [...prev, ...res.result]);
      console.log(res.total, searchList?.length);

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
            <span style={{ color: '#3f51b5' }}>{inputText}</span>
            {e.split(inputText)[1]}
          </S.Li>
        ))}
        {load === true ? <S.Spinner className="spinner" /> : null}
        <li ref={target}>target</li>
      </ul>
    </S.DropDownContainer>
  );
};

export default DropDown;
