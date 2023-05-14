import apiRequest from './index';

const RESOURCE = '/todos';

interface SearchTodoParams {
  q: string;
  page?: number;
  limit?: number;
}

export const getTodoList = async () => {
  const response = await apiRequest.get(`${RESOURCE}`);
  console.log(response);

  return response;
};

export const createTodo = async (data: { title: string }) => {
  const response = await apiRequest.post(`${RESOURCE}`, data);
  console.log(response);

  return response;
};

export const deleteTodo = async (id: string) => {
  const response = await apiRequest.delete(`${RESOURCE}/${id}`);

  return response;
};

export const searchTodo = async ({ q, page = 1, limit = 10 }: SearchTodoParams) => {
  const response = await apiRequest.get('/search', {
    params: {
      q,
      page,
      limit,
    },
  });

  return response;
};
