import apiRequest, { baseInstance } from './index';

const RESOURCE = '/todos';
const FIRST_PAGE = 1;
const RESULTS_PER_PAGE = 10;

export const getTodoList = async () => {
  try {
    const response = await apiRequest.get(`${RESOURCE}`);
    return response;
  } catch (error) {
    throw new Error('API getTodoList error');
  }
};

export const createTodo = async (data: { title: string }) => {
  try {
    const response = await apiRequest.post(`${RESOURCE}`, data);

    return response;
  } catch (error) {
    throw new Error('API createTodo error');
  }
};

export const deleteTodo = async (id: string) => {
  try {
    const response = await apiRequest.delete(`${RESOURCE}/${id}`);

    return response;
  } catch (error) {
    throw new Error('API deleteTodo error');
  }
};

interface IResponse {
  opcode: number;
  message: string;
  data: IData;
}

interface IData {
  q: string;
  page: number;
  limit: number;
  result: string[] | [];
  qty: number;
  total: number;
}

export const getSearchTodos = async (
  query: string,
  page = FIRST_PAGE,
  limit = RESULTS_PER_PAGE
) => {
  try {
    const response = await baseInstance.get<IData>('/search', {
      params: {
        q: query,
        page,
        limit,
      },
    });
    console.log('1: ', response);

    return response.data;
  } catch (error) {
    throw new Error('API getSearchTodos error');
  }
};
