import { exportExcel, exportPdf } from '../utils/exportReport';
import { SettlementTransaction, SummaryRow } from '../types';

interface Props {
  summary: SummaryRow[];
  transactions: SettlementTransaction[];
}

export default function SummarySection({ summary, transactions }: Props) {
  return (
    <div className="bg-white p-4 rounded-2xl shadow-sm">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-bold">Final Report</h3>
        <div className="space-x-2">
          <button onClick={() => exportPdf(summary, transactions)} className="px-3 py-1 bg-red-500 text-white rounded-lg text-sm">Export PDF</button>
          <button onClick={() => exportExcel(summary, transactions)} className="px-3 py-1 bg-emerald-600 text-white rounded-lg text-sm">Export Excel</button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left border-b">
              <th className="py-2">Member</th>
              <th>Paid</th>
              <th>Share</th>
              <th>Balance</th>
            </tr>
          </thead>
          <tbody>
            {summary.map((row) => (
              <tr key={row.member} className="border-b">
                <td className="py-2">{row.member}</td>
                <td>{row.paid.toLocaleString()}</td>
                <td>{row.share.toLocaleString()}</td>
                <td className={row.balance >= 0 ? 'text-emerald-600 font-semibold' : 'text-rose-600 font-semibold'}>
                  {row.balance.toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4">
        <p className="font-semibold mb-2">Settlement Plan</p>
        <ul className="space-y-1 text-sm">
          {transactions.map((tx, idx) => (
            <li key={idx} className="bg-slate-100 rounded p-2">
              {tx.from} transfer {tx.amount.toLocaleString()} to {tx.to}
            </li>
          ))}
          {transactions.length === 0 && <li className="text-slate-400">No transfers needed.</li>}
        </ul>
      </div>
    </div>
  );
}
