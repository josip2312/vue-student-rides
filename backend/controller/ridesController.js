const asyncHandler = require('express-async-handler');
const db = require('../models/index');
const Request = db.Request;
const Ride = db.Ride;
const User = db.User;
const { Op } = require('sequelize');

// @desc    Get all rides
// @route   GET /api/rides
// @access  Public
const getAllRides = asyncHandler(async (req, res, next) => {
    const rides = await Ride.findAll({
        where: {
            userId: {
                [Op.not]: [req.params.id],
            },
        },
    });
    for (let i = 0; i < rides.length; i++) {
        const user = await User.findOne({
            where: { id: rides[i].userId },
        });
        rides[i].dataValues.user = user;
    }

    res.status(200).json(rides || 'No rides');
});

// @desc    Get single ride
// @route   GET /api/rides/:id
// @access  Public
const getSingleRide = asyncHandler(async (req, res, next) => {
    const id = req.params.id;
    const ride = await Ride.findByPk(id);
    res.status(200).json(ride);
});

// @desc    Get user rides
// @route   GET /api/rides/user
// @access  Private
const getUserRides = asyncHandler(async (req, res, next) => {
    const rides = await Ride.findAll({ where: { userId: req.user.id } });

    for (let i = 0; i < rides.length; i++) {
        const user = await User.findOne({ where: { id: rides[i].userId } });
        rides[i].dataValues.user = user;
    }

    res.status(200).json(rides);
});

// @desc    Create a ride
// @route   POST /api/rides/create
// @access  Private
const createRide = asyncHandler(async (req, res, next) => {
    const { startTime, startCity, destinationCity, seats, price } = req.body;
    const ride = await Ride.create({
        startTime,
        startCity,
        destinationCity,
        userId: req.user.id,
        seats,
        price,
    });
    res.status(201).json({ ride, message: 'Ride created' });
});

// @desc    Delete a ride
// @route   DELETE /api/rides/:id
// @access  Private
const deleteRide = asyncHandler(async (req, res, next) => {
    const id = req.params.id;
    await Ride.destroy({ where: { id } });

    res.status(200).json({ message: 'Ride deleted' });
});

// @desc    Get user rides
// @route   GET /api/rides/user
// @access  Private
const getRidePassengers = asyncHandler(async (req, res, next) => {
    const rideId = req.params.id;
    console.log(rideId);
    const requests = await Request.findAll({ where: { rideId: rideId } });

    const passengers = [];

    for (let i = 0; i < requests.length; i++) {
        const requester = await User.findOne({
            where: { id: requests[i].requesterId },
            attributes: ['id', 'name', 'picture'],
        });
        passengers.push(requester);
    }

    res.status(200).json(passengers);
});

// @desc    Send a ride request
// @route   POST /api/rides/request
// @access  Private
const requestRide = asyncHandler(async (req, res, next) => {
    const { rideId } = req.body;
    await Request.create({ requesterId: req.user.id, rideId });
    res.status(201).json({ message: 'Request sent' });
});

// @desc    Get all requests for a ride
// @route   GET /api/rides/requests/:id
// @access  Private
const getRideRequests = asyncHandler(async (req, res, next) => {
    const rideId = req.params.id;
    const requests = await Request.findAll({
        where: { rideId, requestStatus: false },
    });

    if (requests.length < 1) {
        return res.json({ message: 'No requests' });
    } else {
        for (let i = 0; i < requests.length; i++) {
            const requester = await User.findOne({
                where: { id: requests[i].requesterId },
                attributes: ['name', 'picture'],
            });
            const ride = await Ride.findOne({
                where: { id: requests[i].rideId },
                attributes: ['startCity', 'destinationCity'],
            });

            requests[i].dataValues.ride = ride;
            requests[i].dataValues.requester = requester;
        }

        res.status(200).json(requests);
    }
});

// @desc    Accept request for a ride
// @route   PATCH /api/rides/requests/:id
// @access  Private
const acceptRideRequest = asyncHandler(async (req, res, next) => {
    const requestId = req.params.id;
    const request = await Request.findByPk(requestId);

    if (request) {
        request.requestStatus = true;
        request.save();
        res.status(200).json({ message: 'Request accepted' });
    } else {
        res.status(400).json({ message: 'Request not found' });
    }
});

// @desc    Decline request for a ride
// @route   DELETE /api/rides/requests/:id
// @access  Private
const declineRideRequest = asyncHandler(async (req, res, next) => {
    const requestId = req.params.id;
    const request = request.findByPk(requestId);

    if (request) {
        reques.destroy();
        res.status(200).json({ message: 'Request deleted' });
    } else {
        res.status(400).json({ message: 'Request already declined' });
    }
});

module.exports = {
    getAllRides,
    getSingleRide,
    getUserRides,
    createRide,
    deleteRide,
    getRidePassengers,
    requestRide,
    getRideRequests,
    acceptRideRequest,
    declineRideRequest,
};
