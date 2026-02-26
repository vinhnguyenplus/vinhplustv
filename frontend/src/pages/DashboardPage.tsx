import { useEffect, useMemo, useState } from 'react';
import AddExpenseModal from '../components/AddExpenseModal';
import CreateTripModal from '../components/CreateTripModal';
import ExpenseList from '../components/ExpenseList';
import Sidebar from '../components/Sidebar';
import SummarySection from '../components/SummarySection';
import { useTripStore } from '../store/useTripStore';

export default function DashboardPage() {
  const [tripModalOpen, setTripModalOpen] = useState(false);
  const [expenseModalOpen, setExpenseModalOpen] = useState(false);

  const {
    trips,
    selectedTripId,
    expenses,
    summary,
    transactions,
    loading,
    error,
    loadTrips,
    selectTrip,
    addTrip,
    addExpense
  } = useTripStore();

  useEffect(() => {
    loadTrips();
  }, [loadTrips]);

  const selectedTrip = useMemo(() => trips.find((trip) => trip._id === selectedTripId), [trips, selectedTripId]);

  return (
    <div className="min-h-screen bg-slate-100 p-4 lg:p-6">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-[18rem_1fr] gap-4">
        <Sidebar trips={trips} selectedTripId={selectedTripId} onSelect={selectTrip} onCreateTrip={() => setTripModalOpen(true)} />

        <main className="space-y-4">
          <div className="bg-white rounded-2xl p-4 flex flex-wrap gap-3 justify-between items-center">
            <div>
              <h1 className="text-xl font-bold">Travel Bill Split Dashboard</h1>
              <p className="text-sm text-slate-500">Track group expenses, balances, and transfer plan.</p>
            </div>
            <button onClick={() => setExpenseModalOpen(true)} className="bg-indigo-600 text-white px-4 py-2 rounded-xl">+ Add Expense</button>
          </div>

          {loading && <p>Loading...</p>}
          {error && <p className="text-rose-600">{error}</p>}

          <div className="grid xl:grid-cols-2 gap-4">
            <ExpenseList expenses={expenses} />
            <SummarySection summary={summary} transactions={transactions} />
          </div>
        </main>
      </div>

      <CreateTripModal open={tripModalOpen} onClose={() => setTripModalOpen(false)} onSubmit={addTrip} />
      <AddExpenseModal open={expenseModalOpen} trip={selectedTrip} onClose={() => setExpenseModalOpen(false)} onSubmit={addExpense} />
    </div>
  );
}
