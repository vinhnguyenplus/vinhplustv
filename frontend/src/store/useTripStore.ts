import { create } from 'zustand';
import { createExpense } from '../api/expenses';
import { createTrip, fetchTripReport, fetchTrips } from '../api/trips';
import { Expense, SettlementTransaction, SummaryRow, Trip } from '../types';

interface TripState {
  trips: Trip[];
  selectedTripId: string;
  expenses: Expense[];
  summary: SummaryRow[];
  transactions: SettlementTransaction[];
  loading: boolean;
  error: string;
  loadTrips: () => Promise<void>;
  selectTrip: (tripId: string) => Promise<void>;
  addTrip: (trip: Omit<Trip, '_id'>) => Promise<void>;
  addExpense: (payload: FormData) => Promise<void>;
}

export const useTripStore = create<TripState>((set, get) => ({
  trips: [],
  selectedTripId: '',
  expenses: [],
  summary: [],
  transactions: [],
  loading: false,
  error: '',

  loadTrips: async () => {
    set({ loading: true, error: '' });
    try {
      const trips = await fetchTrips();
      const selectedTripId = get().selectedTripId || trips[0]?._id || '';
      set({ trips, selectedTripId, loading: false });
      if (selectedTripId) await get().selectTrip(selectedTripId);
    } catch (error) {
      set({ loading: false, error: 'Cannot load trips' });
    }
  },

  selectTrip: async (tripId: string) => {
    set({ selectedTripId: tripId, loading: true, error: '' });
    try {
      const report = await fetchTripReport(tripId);
      set({
        expenses: report.expenses,
        summary: report.summary,
        transactions: report.transactions,
        loading: false
      });
    } catch {
      set({ loading: false, error: 'Cannot load report' });
    }
  },

  addTrip: async (trip) => {
    await createTrip(trip);
    await get().loadTrips();
  },

  addExpense: async (payload) => {
    await createExpense(payload);
    const selectedTripId = get().selectedTripId;
    if (selectedTripId) await get().selectTrip(selectedTripId);
  }
}));
