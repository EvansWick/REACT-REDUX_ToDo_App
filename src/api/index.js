import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: 'https://randomuser.me/api/',
  timeout: 5000,
});

export const axiosInstanceTasks = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com/',
  timeout: 5000,
});
