require('dotenv').config();
const mongoose = require('mongoose');
const Trip = require('../models/Trip');
const Expense = require('../models/Expense');

const seed = async () => {
  await mongoose.connect(process.env.MONGO_URI);
  await Trip.deleteMany({});
  await Expense.deleteMany({});

  const trip = await Trip.create({
    name: 'Da Nang Adventure',
    location: 'Da Nang',
    startDate: new Date('2026-04-05'),
    endDate: new Date('2026-04-10'),
    members: [{ name: 'An' }, { name: 'Binh' }, { name: 'Chi' }]
  });

  await Expense.insertMany([
    {
      tripId: trip._id,
      title: 'Seafood Dinner',
      amount: 900000,
      currency: 'VND',
      category: 'Food',
      paidBy: 'An',
      splitType: 'equal',
      splitBetween: [{ memberName: 'An' }, { memberName: 'Binh' }, { memberName: 'Chi' }],
      notes: 'Near My Khe beach'
    },
    {
      tripId: trip._id,
      title: 'Hotel 2 nights',
      amount: 2400000,
      currency: 'VND',
      category: 'Stay',
      paidBy: 'Chi',
      splitType: 'custom',
      customSplit: [
        { memberName: 'An', amount: 800000 },
        { memberName: 'Binh', amount: 700000 },
        { memberName: 'Chi', amount: 900000 }
      ]
    }
  ]);

  console.log('Seed completed');
  await mongoose.disconnect();
};

seed().catch((error) => {
  console.error(error);
  process.exit(1);
});
