import { useCallback, useState } from 'react';
import { searchTodo } from '../api/todo';
import { getCache, setCache } from '../utils/cache';

interface UseSearchDataProps {
  setSearchedResponse: React.Dispatch<React.SetStateAction<string[]>>;
  setIsMoreLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setIsNoMoreData: React.Dispatch<React.SetStateAction<boolean>>;
}

function useSearchData({
  setSearchedResponse,
  setIsMoreLoading,
  setIsNoMoreData,
}: UseSearchDataProps) {
  const [currentPage, setCurrentPage] = useState<number>(1);

  const getSearchData = async (updateCurrentPage: number, debouncedSearchQuery: string) => {
    const cacheData = await getCache(debouncedSearchQuery + updateCurrentPage);
    console.log(cacheData);
    if (!cacheData) {
      console.log('caching!!');
      const { data } = await searchTodo({ q: debouncedSearchQuery, page: updateCurrentPage });
      setCache(debouncedSearchQuery + updateCurrentPage, data, 60 * 1000);
      return data;
    }
    console.log('cached!!');
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
      }
      if (type === 'scroll') setCurrentPage((prevPage: number) => prevPage + 1);
      const updateCurrentPage = type === 'scroll' ? currentPage + 1 : 1;
      setIsMoreLoading(true);
      const searchData = await getSearchData(updateCurrentPage, debouncedSearchQuery);
      setSearchedResponse((prevData: string[]) => [...prevData, ...searchData.result]);
      setIsNoMoreData(searchData.page * searchData.limit >= searchData.total);
      setIsMoreLoading(false);
    },
    [currentPage, setIsMoreLoading, setSearchedResponse, setIsNoMoreData]
  );

  return handleSearchData;
}

export default useSearchData;
