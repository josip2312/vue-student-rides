const express = require('express');

const ridesController = require('../controller/ridesController');

const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/:id', ridesController.getAllRides);

router.get('/user/all', protect, ridesController.getUserRides);

router.get('/ride/:id', ridesController.getSingleRide);

router.get('/ride/passengers/:id', ridesController.getRidePassengers);

router.delete('/:id', ridesController.deleteRide);

router.post('/create', protect, ridesController.createRide);

router.post('/request', protect, ridesController.requestRide);

router.get('/requests/:id', protect, ridesController.getRideRequests);

router.patch('/requests/:id', protect, ridesController.acceptRideRequest);

router.delete('/requests/:id', protect, ridesController.declineRideRequest);

module.exports = router;
