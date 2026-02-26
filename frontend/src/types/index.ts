export interface Member {
  name: string;
  avatar?: string;
}

export interface Trip {
  _id: string;
  name: string;
  location: string;
  startDate: string;
  endDate: string;
  members: Member[];
}

export interface SplitEntry {
  memberName: string;
  amount?: number;
}

export interface Expense {
  _id: string;
  tripId: string;
  title: string;
  amount: number;
  currency: string;
  category: string;
  paidBy: string;
  splitType: 'equal' | 'custom';
  splitBetween: SplitEntry[];
  customSplit: Required<SplitEntry>[];
  billImage?: string;
  date: string;
  notes: string;
}

export interface SummaryRow {
  member: string;
  paid: number;
  share: number;
  balance: number;
}

export interface SettlementTransaction {
  from: string;
  to: string;
  amount: number;
}
