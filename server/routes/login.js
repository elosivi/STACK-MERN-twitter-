"use strict"

// Packages
const express = require('express');
const bcrypt = require('bcrypt')
const router = express.Router();
const { check, validationResult } = require('express-validator');

// Model files
const User = require('../models/User')

// Routes
router.get('/login', function (req, res) {
    if (req.session.login) {
        const message = "Logged as " + req.session.login;
        return res.status(200).json({ message });
    }
    const message = "Not logged in";
    return res.status(400).json({ message });
})

router.get('/logout', function (req, res) {
    if (!req.session.login) {
        const message = "Not logged in"
        return res.status(400).json({ message });
    }
    req.session.destroy(function (err) {
        if (err) {
            const message = "Internal Server Error"
            return res.status(500).json({ message });
        } else {
            const message = "Logged out"
            return res.status(200).json({ message });
        }
    })
})

router.post('/login', [
    check('login').notEmpty().withMessage('Login must not be empty'),
    check('password').notEmpty().withMessage('Password must not be empty')
    ], function (req, res) {

    console.log("===== POST LOGIN =====")
    console.log(req.is())
    console.log(req.body)
    
    // Express validator errors
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        const infos = errors.errors;
        return res.status(400).json({ message: infos[0].msg });
    }
    // Check if user exists and get password
    User.findOne({ login: req.body.login }, function (err, user) {
        if (err) {
            const message = "Internal Server Error"
            return res.status(500).json({ message });
        }
        // Check user existence
        if (!user) {
            const message = "User not found";
            return res.status(400).json({ message });
        } 
        
        // Compare plain text password with DB password
        user.comparePassword(req.body.password, function (err, isMatch) {
            if (err) {
                const message = "Internal Server Error";
                return res.status(500).json({ message });
            }
            if (isMatch && isMatch == true) {
                req.session.admin = user.type
                req.session.login = user.login
                req.session.email = user.email
                return res.status(200).json({
                    message: "User logged in",
                    admin: req.session.admin,
                    login: req.session.login,
                    email: req.session.email
                });
            } else {
                // Wrong password
                const message = "This password doesn't match, try again please";
                return res.status(400).json({ message });
            }
        });


    });
})

module.exports = router