const round2 = (value) => Math.round((value + Number.EPSILON) * 100) / 100;

const calcExpenseShares = (expense) => {
  if (expense.splitType === 'custom' && expense.customSplit.length > 0) {
    return expense.customSplit.map((item) => ({
      memberName: item.memberName,
      amount: round2(item.amount)
    }));
  }

  const participants = expense.splitBetween.length > 0 ? expense.splitBetween : [{ memberName: expense.paidBy }];
  const base = round2(expense.amount / participants.length);

  return participants.map((p, idx) => ({
    memberName: p.memberName,
    amount: idx === participants.length - 1 ? round2(expense.amount - base * (participants.length - 1)) : base
  }));
};

const buildSettlementReport = (trip, expenses) => {
  const reportMap = new Map();
  trip.members.forEach((m) => {
    reportMap.set(m.name, { member: m.name, paid: 0, share: 0, balance: 0 });
  });

  expenses.forEach((expense) => {
    if (!reportMap.has(expense.paidBy)) {
      reportMap.set(expense.paidBy, { member: expense.paidBy, paid: 0, share: 0, balance: 0 });
    }

    reportMap.get(expense.paidBy).paid = round2(reportMap.get(expense.paidBy).paid + expense.amount);

    calcExpenseShares(expense).forEach((s) => {
      if (!reportMap.has(s.memberName)) {
        reportMap.set(s.memberName, { member: s.memberName, paid: 0, share: 0, balance: 0 });
      }
      reportMap.get(s.memberName).share = round2(reportMap.get(s.memberName).share + s.amount);
    });
  });

  const summary = Array.from(reportMap.values()).map((item) => ({
    ...item,
    balance: round2(item.paid - item.share)
  }));

  const creditors = summary
    .filter((i) => i.balance > 0)
    .map((i) => ({ member: i.member, amount: i.balance }))
    .sort((a, b) => b.amount - a.amount);

  const debtors = summary
    .filter((i) => i.balance < 0)
    .map((i) => ({ member: i.member, amount: Math.abs(i.balance) }))
    .sort((a, b) => b.amount - a.amount);

  const transactions = [];
  let d = 0;
  let c = 0;

  while (d < debtors.length && c < creditors.length) {
    const settleAmount = round2(Math.min(debtors[d].amount, creditors[c].amount));

    if (settleAmount > 0) {
      transactions.push({
        from: debtors[d].member,
        to: creditors[c].member,
        amount: settleAmount
      });

      debtors[d].amount = round2(debtors[d].amount - settleAmount);
      creditors[c].amount = round2(creditors[c].amount - settleAmount);
    }

    if (debtors[d].amount === 0) d += 1;
    if (creditors[c].amount === 0) c += 1;
  }

  return { summary, transactions };
};

module.exports = { calcExpenseShares, buildSettlementReport, round2 };
