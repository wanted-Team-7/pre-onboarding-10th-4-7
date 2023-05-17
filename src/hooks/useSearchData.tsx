import { useCallback, useState } from 'react';
import { searchTodo } from '../api/todo';
import { getCache, setCache } from '../utils/cache';

interface UseSearchDataProps {
  setSearchLoading: React.Dispatch<React.SetStateAction<boolean>>;
  checkReSearch: React.MutableRefObject<boolean>;
}

function useSearchData({ setSearchLoading, checkReSearch }: UseSearchDataProps) {
  const [currentPage, setCurrentPage] = useState<number>(1);
  // searchedResponse: 검색 결과 데이터
  const [searchedResponse, setSearchedResponse] = useState<string[]>([]);
  // isMoreLoading: 추가 데이터 로딩 중인지 여부
  const [isMoreLoading, setIsMoreLoading] = useState<boolean>(false);
  // isNoMoreData: 더 이상 데이터가 없는지 여부
  const [isMoreData, setIsMoreData] = useState<boolean>(true);
  
  const getSearchData = async (updateCurrentPage: number, debouncedSearchQuery: string) => {
    const cacheData = await getCache(debouncedSearchQuery + updateCurrentPage);
    if (!cacheData) {
      const { data } = await searchTodo({ q: debouncedSearchQuery, page: updateCurrentPage });
      setCache(debouncedSearchQuery + updateCurrentPage, data, 60 * 1000);
      return data;
    }
    return cacheData;
  };

  const handleSearchData = useCallback(
    async (type: string, debouncedSearchQuery: string) => {
      if (debouncedSearchQuery.trim() === '') {
        setSearchedResponse([]);
        return;
      }
      if (type === 'first') {
        setCurrentPage(1);
        setSearchedResponse([]);
        setSearchLoading(true);
      }
      if (type === 'scroll') {
        setCurrentPage((prevPage: number) => prevPage + 1);
        setIsMoreLoading(true);
      }
      const updateCurrentPage = type === 'scroll' ? currentPage + 1 : 1;
      const searchData = await getSearchData(updateCurrentPage, debouncedSearchQuery);
      setSearchedResponse((prevData: string[]) => [...prevData, ...searchData.result]);
      setIsMoreData(data.page * data.limit < data.total);
      setIsMoreLoading(false);
      setSearchLoading(false);
      checkReSearch.current = false;
    },
    [currentPage]
  );

  return { handleSearchData, searchedResponse, currentPage, isMoreLoading, isMoreData };
}

export default useSearchData;
