import { useCallback, useRef, useState } from 'react';
import { searchTodo } from '../api/todo';
import { getCache, setCache } from '../utils/cache';

function useSearchData() {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchedResponse, setSearchedResponse] = useState<string[]>([]);
  const [isMoreLoading, setIsMoreLoading] = useState<boolean>(false);
  const [isMoreData, setIsMoreData] = useState<boolean>(true);
  const checkReSearch = useRef(false);
  const [isSearchLoading, setSearchLoading] = useState<boolean>(false);

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
      setIsMoreData(searchData.page * searchData.limit < searchData.total);
      setIsMoreLoading(false);
      setSearchLoading(false);
      checkReSearch.current = false;
    },
    [currentPage]
  );

  return {
    handleSearchData,
    searchedResponse,
    currentPage,
    isMoreLoading,
    isMoreData,
    checkReSearch,
    isSearchLoading,
  };
}

export default useSearchData;
