const generateToken = require('../utils/generateToken');
const asyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');

const verifyToken = require('../utils/googleAuth');
const hashPassword = require('../utils/hashPassword');

const db = require('../models/index');
const User = db.User;

// @desc    Auth user & get token
// @route   POST /api/auth/login
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email: email } });
    if (user) {
        res.status(400);
        throw new Error('User not found');
    }

    const comparison = await bcrypt.compare(password, user.password);
    if (user && comparison) {
        res.status(200).json({
            id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user.id),
        });
    } else {
        res.status(401);
        throw new Error('Invalid email or password');
    }
});

// @desc    Register or login user with google
// @route   POST /api/auth/google
// @access  Public
const googleAuthenticate = asyncHandler(async (req, res) => {
    const { idToken } = req.body;

    const googleData = await verifyToken(idToken).catch(console.error);
    const { email, name, picture, isEmailVerified } = googleData;
    //check if there is an user in db
    const foundUser = await User.findOne({ where: { email } });
    if (foundUser && isEmailVerified) {
        res.status(200).json({
            id: foundUser.id,
            name,
            email,
            picture,
            token: generateToken(foundUser.id),
        });
    } else {
        //if there isn't create new user
        const user = await User.create({
            email,
            name,
            picture,
        });
        if (user) {
            res.status(201).json({
                id: user.id,
                name: user.name,
                picture: user.picture,
                email: user.email,
                token: generateToken(user.id),
            });
        } else {
            res.status(400);
            throw new Error('Invalid user data');
        }
    }
});

// @desc    Create new user, generate token
// @route   POST /api/auth/register
// @access  Public
const registerUser = asyncHandler(async (req, res, next) => {
    const { email, password, name } = req.body;

    const userExists = await User.findAll({ where: { email } });
    console.log(userExists);
    if (userExists.length > 1) {
        res.status(400);
        throw new Error('User already exists');
    }
    const hashedPassword = hashPassword(password);
    const user = await User.create({
        email,
        password: hashedPassword,
    });
    if (user) {
        res.status(201).json({
            id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user.id),
        });
    } else {
        res.status(400);
        throw new Error('Invalid user data');
    }
});

module.exports = {
    loginUser,
    googleAuthenticate,
    registerUser,
};
