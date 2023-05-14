import apiRequest from './index';

const SEARCH_RESOURCE = '/search';
const TODO_RESOURCE = '/todos';

export const searchTodoList = async (params: { q: string; page: number; limit: 10 }) => {
  try {
    const response = await apiRequest.get(
      `${SEARCH_RESOURCE}?q=${params.q}&page=${params.page}&limit=${params.limit}`
    );
    return response;
  } catch (error) {
    throw new Error('API searchTodoList error');
  }
};

export const getTodoList = async () => {
  try {
    const response = await apiRequest.get(`${TODO_RESOURCE}`);
    return response;
  } catch (error) {
    throw new Error('API getTodoList error');
  }
};

export const createTodo = async (data: { title: string }) => {
  try {
    const response = await apiRequest.post(`${TODO_RESOURCE}`, data);

    return response;
  } catch (error) {
    throw new Error('API createTodo error');
  }
};

export const deleteTodo = async (id: string) => {
  try {
    const response = await apiRequest.delete(`${TODO_RESOURCE}/${id}`);

    return response;
  } catch (error) {
    throw new Error('API deleteTodo error');
  }
};
