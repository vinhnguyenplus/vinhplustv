import { imageBaseUrl } from '../api/client';
import { Expense } from '../types';

interface Props {
  expenses: Expense[];
}

export default function ExpenseList({ expenses }: Props) {
  return (
    <div className="bg-white p-4 rounded-2xl shadow-sm">
      <h3 className="font-bold mb-3">Expenses</h3>
      <div className="space-y-3">
        {expenses.map((expense) => (
          <div key={expense._id} className="border rounded-xl p-3">
            <div className="flex justify-between">
              <div>
                <p className="font-semibold">{expense.title}</p>
                <p className="text-sm text-slate-500">{expense.category} • Paid by {expense.paidBy}</p>
              </div>
              <p className="font-bold">{expense.amount.toLocaleString()} {expense.currency}</p>
            </div>
            {expense.billImage && (
              <img src={`${imageBaseUrl}${expense.billImage}`} alt="bill" className="h-28 mt-2 rounded-lg object-cover" />
            )}
          </div>
        ))}
        {expenses.length === 0 && <p className="text-slate-400">No expenses yet.</p>}
      </div>
    </div>
  );
}
