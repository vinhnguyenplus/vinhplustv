const express = require('express');
const { createTrip, getTrips, getTripReport } = require('../controllers/tripController');

const router = express.Router();

router.route('/').post(createTrip).get(getTrips);
router.get('/:tripId/report', getTripReport);

module.exports = router;
