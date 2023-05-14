import axios, { AxiosRequestConfig } from 'axios';

const baseURL = process.env.REACT_APP_API_URL;
const token = process.env.REACT_APP_TOKEN;

const baseInstance = axios.create({
  baseURL,
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

baseInstance.interceptors.response.use(({ data }) => data);

const apiRequest = {
  get: (url: string, request?: AxiosRequestConfig) => baseInstance.get(url, request),
  delete: (url: string, request?: AxiosRequestConfig) => baseInstance.delete(url, request),
  post: (url: string, data: { title: string }, config?: AxiosRequestConfig) =>
    baseInstance.post(url, data, config),
};

export default apiRequest;
