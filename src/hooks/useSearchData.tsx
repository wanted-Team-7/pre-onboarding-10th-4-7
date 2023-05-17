import { useCallback, useState } from 'react';
import { searchTodo } from '../api/todo';

interface UseSearchDataProps {
  setSearchedResponse: React.Dispatch<React.SetStateAction<string[]>>;
  setIsMoreLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setIsMoreData: React.Dispatch<React.SetStateAction<boolean>>;
}

function useSearchData({
  setSearchedResponse,
  setIsMoreLoading,
  setIsMoreData,
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
      }
      if (type === 'scroll') setCurrentPage((prevPage: number) => prevPage + 1);
      const updateCurrentPage = type === 'scroll' ? currentPage + 1 : 1;
      setIsMoreLoading(true);
      const { data } = await searchTodo({ q: debouncedSearchQuery, page: updateCurrentPage });
      setSearchedResponse((prevData: string[]) => [...prevData, ...data.result]);
      setIsMoreData(data.page * data.limit < data.total);
      setIsMoreLoading(false);
    },
    [currentPage, setIsMoreLoading, setSearchedResponse, setIsMoreData]
  );

  return handleSearchData;
}

export default useSearchData;
