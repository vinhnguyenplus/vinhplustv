import { jsPDF } from 'jspdf';
import * as XLSX from 'xlsx';
import { SettlementTransaction, SummaryRow } from '../types';

export const exportPdf = (summary: SummaryRow[], transactions: SettlementTransaction[]) => {
  const doc = new jsPDF();
  doc.text('Travel Bill Settlement Report', 14, 15);
  let y = 25;
  summary.forEach((row) => {
    doc.text(`${row.member}: Paid ${row.paid}, Share ${row.share}, Balance ${row.balance}`, 14, y);
    y += 8;
  });

  y += 6;
  doc.text('Settlement Plan:', 14, y);
  y += 8;
  transactions.forEach((tx) => {
    doc.text(`${tx.from} pays ${tx.amount} to ${tx.to}`, 14, y);
    y += 8;
  });

  doc.save('travel-settlement.pdf');
};

export const exportExcel = (summary: SummaryRow[], transactions: SettlementTransaction[]) => {
  const workbook = XLSX.utils.book_new();
  const summarySheet = XLSX.utils.json_to_sheet(summary);
  const txSheet = XLSX.utils.json_to_sheet(transactions);
  XLSX.utils.book_append_sheet(workbook, summarySheet, 'Summary');
  XLSX.utils.book_append_sheet(workbook, txSheet, 'Transactions');
  XLSX.writeFile(workbook, 'travel-settlement.xlsx');
};
