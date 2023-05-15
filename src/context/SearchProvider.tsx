import { createContext, useContext, useState } from 'react';
import { searchTodoList } from '../api/todo';
import { SearchContextType, SearchDispatchType } from '../types/context';

const SearchContext = createContext<SearchContextType | null>(null);
const SearchDispatchContext = createContext<SearchDispatchType | null>(null);

export function SearchProvider({ children }: React.PropsWithChildren) {
  const [isTotal, setIsTotal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [isSearchLoading, setIsSearchLoading] = useState(false);
  const [searchListData, setSearchListData] = useState<string[]>([]);

  const handleSearchFetch = async (type: string, inputText: string) => {
    if (inputText.trim() === '') {
      setSearchListData([]);
      return;
    }
    if (type === 'first') {
      setCurrentPage(1);
      setSearchListData([]);
    }
    if (type === 'scroll') setCurrentPage(prev => prev + 1);
    setIsSearchLoading(true);
    const updateCurrentPage = type === 'scroll' ? currentPage + 1 : 1;
    const { data } = await searchTodoList({ q: inputText, page: updateCurrentPage, limit: 10 });
    setSearchListData(prev => [...prev, ...data.result]);
    setIsTotal(data.page * data.limit >= data.total);
    setIsSearchLoading(false);
  };

  return (
    <SearchContext.Provider value={{ isTotal, isSearchLoading, searchListData }}>
      <SearchDispatchContext.Provider value={{ handleSearchFetch }}>
        {children}
      </SearchDispatchContext.Provider>
    </SearchContext.Provider>
  );
}

export const useSearchState = () => {
  const state = useContext(SearchContext);
  if (!state) {
    throw new Error('SearchContextProvider not found');
  }
  return state;
};

export const useSearchDispatch = () => {
  const state = useContext(SearchDispatchContext);
  if (!state) {
    throw new Error('SearchDispatchContextProvider not found');
  }
  return state;
};
