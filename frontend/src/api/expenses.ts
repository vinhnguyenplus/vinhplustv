import api from './client';
import { Expense } from '../types';

export const createExpense = async (payload: FormData) => {
  const response = await api.post<Expense>('/expenses', payload, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });
  return response.data;
};
