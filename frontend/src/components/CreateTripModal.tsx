import { FormEvent, useState } from 'react';

interface Props {
  open: boolean;
  onClose: () => void;
  onSubmit: (payload: {
    name: string;
    location: string;
    startDate: string;
    endDate: string;
    members: { name: string; avatar?: string }[];
  }) => Promise<void>;
}

export default function CreateTripModal({ open, onClose, onSubmit }: Props) {
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [members, setMembers] = useState('');

  if (!open) return null;

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    await onSubmit({
      name,
      location,
      startDate,
      endDate,
      members: members
        .split(',')
        .map((x) => x.trim())
        .filter(Boolean)
        .map((name) => ({ name }))
    });
    setName('');
    setLocation('');
    setStartDate('');
    setEndDate('');
    setMembers('');
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center p-4">
      <form onSubmit={handleSubmit} className="bg-white w-full max-w-lg p-6 rounded-2xl space-y-3">
        <h3 className="font-bold text-lg">Create Trip</h3>
        <input value={name} onChange={(e) => setName(e.target.value)} required className="w-full border p-2 rounded" placeholder="Trip name" />
        <input value={location} onChange={(e) => setLocation(e.target.value)} required className="w-full border p-2 rounded" placeholder="Location" />
        <div className="grid grid-cols-2 gap-2">
          <input type="date" required value={startDate} onChange={(e) => setStartDate(e.target.value)} className="border p-2 rounded" />
          <input type="date" required value={endDate} onChange={(e) => setEndDate(e.target.value)} className="border p-2 rounded" />
        </div>
        <input
          value={members}
          onChange={(e) => setMembers(e.target.value)}
          required
          className="w-full border p-2 rounded"
          placeholder="Members (comma separated)"
        />
        <div className="flex justify-end gap-2">
          <button type="button" onClick={onClose} className="px-4 py-2 bg-slate-200 rounded">Cancel</button>
          <button className="px-4 py-2 bg-indigo-600 text-white rounded">Save</button>
        </div>
      </form>
    </div>
  );
}
