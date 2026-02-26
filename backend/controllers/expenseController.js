const Expense = require('../models/Expense');
const Trip = require('../models/Trip');

const createExpense = async (req, res) => {
  try {
    const payload = { ...req.body };

    payload.amount = Number(payload.amount);
    payload.splitBetween = payload.splitBetween ? JSON.parse(payload.splitBetween) : [];
    payload.customSplit = payload.customSplit ? JSON.parse(payload.customSplit) : [];
    payload.date = payload.date ? new Date(payload.date) : new Date();
    if (req.file) payload.billImage = `/${req.file.path}`;

    const tripExists = await Trip.findById(payload.tripId);
    if (!tripExists) {
      return res.status(404).json({ message: 'Trip not found' });
    }

    const expense = await Expense.create(payload);
    return res.status(201).json(expense);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

const getExpensesByTrip = async (req, res) => {
  try {
    const expenses = await Expense.find({ tripId: req.params.tripId }).sort({ date: -1 });
    res.json(expenses);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = { createExpense, getExpensesByTrip };
