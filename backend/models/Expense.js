const mongoose = require('mongoose');

const splitBetweenSchema = new mongoose.Schema(
  {
    memberName: { type: String, required: true }
  },
  { _id: false }
);

const customSplitSchema = new mongoose.Schema(
  {
    memberName: { type: String, required: true },
    amount: { type: Number, required: true, min: 0 }
  },
  { _id: false }
);

const expenseSchema = new mongoose.Schema(
  {
    tripId: { type: mongoose.Schema.Types.ObjectId, ref: 'Trip', required: true },
    title: { type: String, required: true, trim: true },
    amount: { type: Number, required: true, min: 0 },
    currency: { type: String, default: 'VND' },
    category: { type: String, default: 'General' },
    paidBy: { type: String, required: true },
    splitType: { type: String, enum: ['equal', 'custom'], default: 'equal' },
    splitBetween: { type: [splitBetweenSchema], default: [] },
    customSplit: { type: [customSplitSchema], default: [] },
    billImage: { type: String, default: '' },
    date: { type: Date, default: Date.now },
    notes: { type: String, default: '' }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Expense', expenseSchema);
