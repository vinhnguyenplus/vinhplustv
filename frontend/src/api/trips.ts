import api from './client';
import { Expense, Trip } from '../types';

export interface ReportResponse {
  trip: Trip;
  expenses: Expense[];
  summary: Array<{ member: string; paid: number; share: number; balance: number }>;
  transactions: Array<{ from: string; to: string; amount: number }>;
}

export const fetchTrips = async () => (await api.get<Trip[]>('/trips')).data;
export const createTrip = async (payload: Omit<Trip, '_id'>) => (await api.post<Trip>('/trips', payload)).data;
export const fetchTripReport = async (tripId: string) => (await api.get<ReportResponse>(`/trips/${tripId}/report`)).data;
