const asyncHandler = require('express-async-handler');
const db = require('../models/index');
const City = db.City;
const Ride = db.Ride;
const User = db.User;

// @desc    Get all rides
// @route   GET /api/rides
// @access  Public
const getAllRides = asyncHandler(async (req, res, next) => {
    const rides = await Ride.findAll();
    for (let i = 0; i < rides.length; i++) {
        const user = await User.findOne({ where: { id: rides[i].userId } });
        rides[i].dataValues.user = user;
    }

    res.status(200).json(rides);
});

// @desc    Get single ride
// @route   GET /api/rides/:id
// @access  Public
const getSingleRide = asyncHandler(async (req, res, next) => {
    const id = req.params.id;
    const ride = await Ride.findOne({ where: { id } });

    res.status(200).json(ride);
});

// @desc    Get user rides
// @route   GET /api/rides/user
// @access  Private
const getUserRides = asyncHandler(async (req, res, next) => {
    const rides = await Ride.findAll({ where: { userId: req.user.id } });
    //fetch request where requester_id = req.user.id
    //fetch rides where id === request - ride.id && request is approved
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
    console.log(req.body);
    const ride = await Ride.create({
        startTime,
        startCity,
        destinationCity,
        userId: req.user.id,
        seats,
        price,
    });
    res.status(201).json({ ride, msg: 'Ride created' });
});

// @desc    Delete a ride
// @route   DELETE /api/rides/:id
// @access  Private
const deleteRide = asyncHandler(async (req, res, next) => {
    const id = req.params.id;
    await Ride.destroy({ where: { id } });

    res.status(201).json({ msg: 'Ride deleted' });
});

module.exports = {
    getAllRides,
    getSingleRide,
    getUserRides,
    createRide,
    deleteRide,
};
