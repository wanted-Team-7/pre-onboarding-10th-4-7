import apiRequest from './index';
import { baseInstance } from './index';
import { ENDPOINT_RESOURCE, ENDPOINT_SEARCH } from '../util/constant';

interface ResponseType {
  limit?: number;
  page?: number;
  q?: string;
  qty?: number;
  total: number;
  result: string[] | [];
}

export const getSearchList = async (
  target: string,
  crnt_page: number,
  limit: number
): Promise<ResponseType> => {
  if (target === '') return { result: [], total: 0 };
  try {
    const { data: response } = await baseInstance.get(ENDPOINT_SEARCH, {
      params: {
        q: target,
        page: crnt_page,
        limit: limit,
      },
    });
    return response;
  } catch (error) {
    throw new Error('API getSearchList error');
  }
};

export const getTodoList = async () => {
  try {
    const response = await apiRequest.get(`${ENDPOINT_RESOURCE}`);
    return response;
  } catch (error) {
    throw new Error('API getTodoList error');
  }
};

export const createTodo = async (data: { title: string }) => {
  try {
    const response = await apiRequest.post(`${ENDPOINT_RESOURCE}`, data);

    return response;
  } catch (error) {
    throw new Error('API createTodo error');
  }
};

export const deleteTodo = async (id: string) => {
  try {
    const response = await apiRequest.delete(`${ENDPOINT_RESOURCE}/${id}`);

    return response;
  } catch (error) {
    throw new Error('API deleteTodo error');
  }
};
