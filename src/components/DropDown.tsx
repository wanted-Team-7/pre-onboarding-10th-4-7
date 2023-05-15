import { useRef, useEffect, useCallback, useState } from 'react';
import { FaPlusCircle, FaSpinner } from 'react-icons/fa';
import { S } from './DropDown.styled';
import { LIMIT } from '../constant';
import { getSearchList } from '../api/todo';

interface DropDownProps {
  searchList: string[] | undefined;
  setSearchList: React.Dispatch<React.SetStateAction<string[]>>;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  inputText: string;
}

const DropDown = ({
  searchList,
  setSearchList,
  currentPage,
  setCurrentPage,
  inputText,
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
    console.log('get list');
  }, [currentPage]);

  const obsHandler = (entries: any) => {
    //옵저버 콜백함수
    const test = entries[0];

    if (test.isIntersecting && endRef.current === false) {
      //옵저버 중복 실행 방지)
      preventRef.current = false; //옵저버 중복 실행 방지
      setCurrentPage(prev => prev + 1); //페이지 값 증가
    }
  };

  const getPost = useCallback(async () => {
    setLoad(true);
    try {
      const res = await getSearchList(inputText, currentPage, LIMIT);
      setSearchList(prev => [...prev, ...res.result]);
      if (res.total === searchList?.length) {
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
    <S.Container>
      <ul>
        {searchList?.map((e: string, idx: number) => (
          <li key={idx}>{e}</li>
        ))}
        {load === true ? <FaSpinner className="spinner" /> : null}
        <li ref={target}>target</li>
      </ul>
    </S.Container>
  );
};

export default DropDown;
