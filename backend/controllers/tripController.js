const Trip = require('../models/Trip');
const Expense = require('../models/Expense');
const { buildSettlementReport } = require('../utils/settlement');

const createTrip = async (req, res) => {
  try {
    const trip = await Trip.create(req.body);
    res.status(201).json(trip);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getTrips = async (_req, res) => {
  const trips = await Trip.find().sort({ createdAt: -1 });
  res.json(trips);
};

const getTripReport = async (req, res) => {
  try {
    const trip = await Trip.findById(req.params.tripId);
    if (!trip) {
      return res.status(404).json({ message: 'Trip not found' });
    }

    const expenses = await Expense.find({ tripId: trip._id }).sort({ date: -1 });
    const report = buildSettlementReport(trip, expenses);

    return res.json({
      trip,
      expenses,
      ...report
    });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

module.exports = { createTrip, getTrips, getTripReport };
