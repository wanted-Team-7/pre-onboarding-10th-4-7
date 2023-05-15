import apiRequest from './index';

const RESOURCE_TODO = '/todos';
const RESOURCE_SEARCH = '/search';

interface SearchKeywordType {
  keyword: string;
  page: number;
}

export const getTodoList = async () => {
  try {
    const response = await apiRequest.get(`${RESOURCE_TODO}`);
    return response;
  } catch (error) {
    throw new Error('API getTodoList error');
  }
};

export const createTodo = async (data: { title: string }) => {
  try {
    const response = await apiRequest.post(`${RESOURCE_TODO}`, data);

    return response;
  } catch (error) {
    throw new Error('API createTodo error');
  }
};

export const deleteTodo = async (id: string) => {
  try {
    const response = await apiRequest.delete(`${RESOURCE_TODO}/${id}`);

    return response;
  } catch (error) {
    throw new Error('API deleteTodo error');
  }
};

export const searchTodoKeyword = async ({ keyword, page }: SearchKeywordType) => {
  try {
    const response = await apiRequest.get(`${RESOURCE_SEARCH}?q=${keyword}&page=${page}&limit=10`);

    return response;
  } catch (error) {
    throw new Error('API searchTodoKeyword error');
  }
};
