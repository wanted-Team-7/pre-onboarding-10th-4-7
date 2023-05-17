import { useCallback, useState } from 'react';
import { searchTodo } from '../api/todo';

function useSearchData() {
  const [currentPage, setCurrentPage] = useState<number>(1);

  // searchedResponse: 검색 결과 데이터
  const [searchedResponse, setSearchedResponse] = useState<string[]>([]);
  // isMoreLoading: 추가 데이터 로딩 중인지 여부
  const [isMoreLoading, setIsMoreLoading] = useState<boolean>(false);
  // isNoMoreData: 더 이상 데이터가 없는지 여부
  const [isMoreData, setIsMoreData] = useState<boolean>(true);

  const handleSearchData = useCallback(
    async (type: string, debouncedSearchQuery: string) => {
      if (debouncedSearchQuery.trim() === '') {
        setSearchedResponse([]);
        return;
      }
      if (type === 'first') {
        setCurrentPage(1);
        setSearchedResponse([]);
      }
      if (type === 'scroll') setCurrentPage((prevPage: number) => prevPage + 1);
      const updateCurrentPage = type === 'scroll' ? currentPage + 1 : 1;
      setIsMoreLoading(true);
      const { data } = await searchTodo({ q: debouncedSearchQuery, page: updateCurrentPage });
      setSearchedResponse((prevData: string[]) => [...prevData, ...data.result]);
      setIsMoreData(data.page * data.limit < data.total);
      setIsMoreLoading(false);
    },
    [currentPage]
  );

  return { handleSearchData, searchedResponse, currentPage, isMoreLoading, isMoreData };
}

export default useSearchData;
