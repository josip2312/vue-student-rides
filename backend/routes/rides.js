const express = require('express');

const ridesController = require('../controller/ridesController');

const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', ridesController.getAllRides);

router.get('/user', protect, ridesController.getUserRides);

router.get('/:id', ridesController.getSingleRide);

router.delete('/:id', ridesController.deleteRide);

router.post('/create', protect, ridesController.createRide);

module.exports = router;
