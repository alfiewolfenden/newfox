const express = require('express');
const { check } = require('express-validator');

const userController = require('../controllers/user-controllers');

const router = express.Router();

router.post(
    '/signup',
    [
        check('email')
            .normalizeEmail()
            .isEmail(),
        check('password')
            .isLength({ min: 6 })
    ],
    userController.signupUser);

router.post('/signin', userController.signinUser);

module.exports = router;