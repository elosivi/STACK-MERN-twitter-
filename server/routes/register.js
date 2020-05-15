"use strict"

const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt')

const { check, validationResult } = require('express-validator');

const User = require('../models/User')

router.post('/register', [
    check('login').notEmpty().withMessage('Login must not be empty'),
    check('login').isLength({ min: 5 }).withMessage('Login length must be more than 5 characters'),
    check('login').isLength({ max: 20 }).withMessage('Login length must be less than 20 characters'),
    check('email').notEmpty().withMessage('Email must not be empty'),
    check('email').isEmail().withMessage('Email must be at email format'),
    check('password').notEmpty().withMessage('Password must not be empty'),
    check('confirm_password').notEmpty().withMessage('Password confirmation must not be empty')
    ], async function (req, res) {

    console.log("===== POST REGISTER =====")
    console.log(req.is())
    console.log(req.body)

    // Express validator errors
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        const infos = errors.errors;
        return res.status(400).json({ message: infos[0].msg });
    }

    // Check password confirmation match
    if (req.body.password !== req.body.confirm_password) {
        const message = "Passwords do not match";
        return res.status(400).json({ message });
    }

    // Make the new User before insert into DB
    const newUser = new User({
        login: req.body.login,
        email: req.body.email,
        password: req.body.password,
        admin: false
    });

    // Check if login already exists in DB
    const isLoginExist = await User.exists({ login: newUser.login })
        .then((isLogin) => {
            return isLogin;
        })
        .catch((error) => {
            return error;
        })
        if (isLoginExist === true) {
            const message = "This login already exists";
            return res.status(400).json({ message });
        } else if (isLoginExist !== false) {
            const message = "Internal Server Error";
            return res.status(500).json({ message });
        }

    // Check if email already exists in DB
    const isEmailExist = await User.exists({ email: newUser.email })
        .then((isEmail) => {
            return isEmail;
        })
        .catch((error) => {
            return error;
        })
    if (isEmailExist === true) {
        return res.status(400).json("This email already exists");
    } else if (isEmailExist !== false) {
        return res.status(500).json("Internal Server Error");
    }

    newUser.save(function (err) {
        if (err) {
            return res.status(500).json("Internal Server Error");
        } else {
            
            req.session.admin = newUser.admin;
            req.session.login = newUser.login;

            return res.status(201).json({
                message: "User Created",
                admin: req.session.admin,
                login: req.session.login
            });
        }
    });
})

module.exports = router

