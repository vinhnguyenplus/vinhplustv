import { Trip } from '../types';

interface Props {
  trips: Trip[];
  selectedTripId: string;
  onSelect: (id: string) => void;
  onCreateTrip: () => void;
}

export default function Sidebar({ trips, selectedTripId, onSelect, onCreateTrip }: Props) {
  return (
    <aside className="w-full lg:w-72 bg-slate-900 text-white p-4 rounded-2xl">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold">Trips</h2>
        <button onClick={onCreateTrip} className="bg-indigo-500 px-3 py-1 rounded-lg text-sm">+ Trip</button>
      </div>
      <div className="space-y-2">
        {trips.map((trip) => (
          <button
            key={trip._id}
            onClick={() => onSelect(trip._id)}
            className={`w-full text-left p-3 rounded-lg ${selectedTripId === trip._id ? 'bg-indigo-600' : 'bg-slate-800'}`}
          >
            <p className="font-semibold">{trip.name}</p>
            <p className="text-xs text-slate-300">{trip.location}</p>
          </button>
        ))}
      </div>
    </aside>
  );
}
