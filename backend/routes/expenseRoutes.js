const express = require('express');
const upload = require('../middleware/upload');
const { createExpense, getExpensesByTrip } = require('../controllers/expenseController');

const router = express.Router();

router.post('/', upload.single('billImage'), createExpense);
router.get('/trip/:tripId', getExpensesByTrip);

module.exports = router;
