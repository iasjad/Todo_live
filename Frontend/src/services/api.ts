import axios from 'axios';
import type { Task } from '../types/task';
import type { User } from '../types/user';

const API_URL = import.meta.env.VITE_API_URL;

const apiClient = axios.create({
  baseURL: `${API_URL}/api`,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const getMe = async (): Promise<User> => {
  const response = await apiClient.get('/auth/me');
  return response.data.data;
};

export const loginUser = async (data: any) => {
  const response = await apiClient.post('/auth/login', data);
  return response.data;
};

export const registerUser = async (data: any) => {
  const response = await apiClient.post('/auth/register', data);
  return response.data;
};

export const getTasks = async (): Promise<Task[]> => {
  const response = await apiClient.get('/tasks');
  return response.data;
};

export const addTask = async (text: string): Promise<Task> => {
  const response = await apiClient.post('/tasks', { text });
  return response.data;
};

export const updateTask = async (
  id: string,
  data: { status: Task['status'] }
): Promise<Task> => {
  const response = await apiClient.put(`/tasks/${id}`, data);
  return response.data;
};

export const deleteTask = async (id: string): Promise<void> => {
  await apiClient.delete(`/tasks/${id}`);
};
