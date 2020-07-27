const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/user');
const HttpError = require('../models/http-error');

const signupUser = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const error = new HttpError('Invalid inputs passed, please check your data.', 422);
        return next(error);
    }

    const { email, password } = req.body;

    let hasUser;
    try {
        hasUser = await User.findOne({ email });
    } catch (err) {
        const error = new HttpError('Something went wrong :(', 500);
        return next(error);
    }

    if (hasUser) {
        const error = new HttpError('This email address is already registered.', 422);
        return next(error);
    }

    let hashedPassword;
    try {
        hashedPassword = await bcrypt.hash(password, 12);
    } catch (err) {
        const error = new HttpError('Could not create user, please try again', 500);
        return next(error);
    }

    const newUser = new User(
        {
            email,
            password: hashedPassword,
            pgroup: 'default',
            cartitems: []
        }
    );

    try {
        await newUser.save();
    } catch (err) {
        const error = new HttpError('Something went wrong :(', 500);
        return next(error);
    }

    let token;
    try {
        token = jwt.sign(
            { userId: newUser.id, email: newUser.email },
            process.env.JWT_KEY,
            { expiresIn: '1h' }
        );
    } catch (err) {
        const error = new HttpError('Something went wrong :(', 500);
        return next(error);
    }

    res.status(201).json({ userId: newUser.id, email: newUser.email, token });
};

const signinUser = async (req, res, next) => {
    const { email, password } = req.body;

    let currentUser;
    try {
        currentUser = await User.findOne({ email });
    } catch (err) {
        const error = new HttpError('Something went wrong :(', 500);
        return next(error);
    }

    if (!currentUser) {
        const error = new HttpError('Could not identify user/password.', 401);
        return next(error);
    }

    let isValidPassword = false;
    try {
        isValidPassword = await bcrypt.compare(password, currentUser.password);
    } catch (err) {
        const error = new HttpError('Could not log you in, please check credentials and try again.', 500);
        return next(error);
    }

    if (!isValidPassword) {
        const error = new HttpError('Could not identify user/password.', 403);
        return next(error);
    }

    let token;
    try {
        token = jwt.sign(
            { userId: currentUser.id, email: currentUser.email },
            process.env.JWT_KEY,
            { expiresIn: '1h' }
        );
    } catch (err) {
        const error = new HttpError('Something went wrong :(', 500);
        return next(error);
    }

    res.status(200).json({ userId: currentUser.id, email: currentUser.email, token });
};

exports.signupUser = signupUser;
exports.signinUser = signinUser;
