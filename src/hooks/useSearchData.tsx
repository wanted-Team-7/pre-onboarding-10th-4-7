import { useCallback, useState } from 'react';
import { searchTodo } from '../api/todo';

interface UseSearchDataProps {
  setSearchedResponse: React.Dispatch<React.SetStateAction<string[]>>;
  setIsMoreLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setIsNoMoreData: React.Dispatch<React.SetStateAction<boolean>>;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  checkReSearch: React.MutableRefObject<boolean>;
  preventRef: React.MutableRefObject<boolean>;
}

function useSearchData({
  setSearchedResponse,
  setIsMoreLoading,
  setIsNoMoreData,
  setIsLoading,
  checkReSearch,
  preventRef,
}: UseSearchDataProps) {
  const [currentPage, setCurrentPage] = useState<number>(1);

  const handleSearchData = useCallback(
    async (type: string, debouncedSearchQuery: string) => {
      if (debouncedSearchQuery.trim() === '') {
        setSearchedResponse([]);
        return;
      }
      if (type === 'first') {
        setCurrentPage(1);
        setSearchedResponse([]);
        setIsLoading(true);
      }
      if (type === 'scroll') {
        setCurrentPage((prevPage: number) => prevPage + 1);
        setIsMoreLoading(true);
      }
      const updateCurrentPage = type === 'scroll' ? currentPage + 1 : 1;
      const { data } = await searchTodo({ q: debouncedSearchQuery, page: updateCurrentPage });
      setSearchedResponse((prevData: string[]) => [...prevData, ...data.result]);
      setIsNoMoreData(data.page * data.limit >= data.total);
      setIsLoading(false);
      setIsMoreLoading(false);
      checkReSearch.current = false;
      preventRef.current = false;
    },
    [currentPage, setIsMoreLoading, setSearchedResponse, setIsNoMoreData]
  );

  return handleSearchData;
}

export default useSearchData;
