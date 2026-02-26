import { FormEvent, useMemo, useState } from 'react';
import { Trip } from '../types';

interface Props {
  open: boolean;
  trip?: Trip;
  onClose: () => void;
  onSubmit: (payload: FormData) => Promise<void>;
}

export default function AddExpenseModal({ open, trip, onClose, onSubmit }: Props) {
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [currency, setCurrency] = useState('VND');
  const [category, setCategory] = useState('Food');
  const [paidBy, setPaidBy] = useState('');
  const [splitType, setSplitType] = useState<'equal' | 'custom'>('equal');
  const [date, setDate] = useState('');
  const [notes, setNotes] = useState('');
  const [billImage, setBillImage] = useState<File | null>(null);
  const [custom, setCustom] = useState<Record<string, string>>({});

  const members = trip?.members || [];

  const splitBetween = useMemo(() => members.map((m) => ({ memberName: m.name })), [members]);

  if (!open || !trip) return null;

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('tripId', trip._id);
    formData.append('title', title);
    formData.append('amount', amount);
    formData.append('currency', currency);
    formData.append('category', category);
    formData.append('paidBy', paidBy || members[0]?.name || '');
    formData.append('splitType', splitType);
    formData.append('splitBetween', JSON.stringify(splitBetween));
    formData.append(
      'customSplit',
      JSON.stringify(
        members.map((m) => ({
          memberName: m.name,
          amount: Number(custom[m.name] || 0)
        }))
      )
    );
    formData.append('date', date || new Date().toISOString());
    formData.append('notes', notes);
    if (billImage) formData.append('billImage', billImage);

    await onSubmit(formData);
    setTitle('');
    setAmount('');
    setNotes('');
    setBillImage(null);
    setCustom({});
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center p-4 z-50">
      <form onSubmit={handleSubmit} className="bg-white w-full max-w-xl p-6 rounded-2xl space-y-3 max-h-[90vh] overflow-auto">
        <h3 className="font-bold text-lg">Add Expense</h3>
        <input required value={title} onChange={(e) => setTitle(e.target.value)} className="w-full border p-2 rounded" placeholder="Expense title" />
        <div className="grid grid-cols-2 gap-2">
          <input required type="number" value={amount} onChange={(e) => setAmount(e.target.value)} className="border p-2 rounded" placeholder="Amount" />
          <input value={currency} onChange={(e) => setCurrency(e.target.value)} className="border p-2 rounded" placeholder="Currency" />
        </div>
        <div className="grid grid-cols-2 gap-2">
          <input value={category} onChange={(e) => setCategory(e.target.value)} className="border p-2 rounded" placeholder="Category" />
          <select value={paidBy} onChange={(e) => setPaidBy(e.target.value)} className="border p-2 rounded">
            {members.map((m) => <option key={m.name}>{m.name}</option>)}
          </select>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <select value={splitType} onChange={(e) => setSplitType(e.target.value as 'equal' | 'custom')} className="border p-2 rounded">
            <option value="equal">Equal split</option>
            <option value="custom">Custom split</option>
          </select>
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="border p-2 rounded" />
        </div>

        {splitType === 'custom' && (
          <div className="border rounded p-3 space-y-2">
            <p className="text-sm font-semibold">Custom Split</p>
            {members.map((m) => (
              <input
                key={m.name}
                type="number"
                placeholder={`${m.name} amount`}
                value={custom[m.name] || ''}
                onChange={(e) => setCustom((prev) => ({ ...prev, [m.name]: e.target.value }))}
                className="w-full border p-2 rounded"
              />
            ))}
          </div>
        )}

        <textarea value={notes} onChange={(e) => setNotes(e.target.value)} className="w-full border p-2 rounded" placeholder="Notes" />
        <input type="file" accept="image/*" onChange={(e) => setBillImage(e.target.files?.[0] || null)} />

        <div className="flex justify-end gap-2">
          <button type="button" onClick={onClose} className="px-4 py-2 bg-slate-200 rounded">Cancel</button>
          <button className="px-4 py-2 bg-emerald-600 text-white rounded">Add</button>
        </div>
      </form>
    </div>
  );
}
