"use strict"

// Packages
const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');

const mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);

// const ObjectId = mongoose.Types.ObjectId;

// Model files
const Tweet = require('../models/Tweet')
// const Comment = require('../models/Comment')

// Routes

// ======================================== GET TWEET(S) ========================================

router.get('/tweets/:tweetId?', async function (req, res) {

    // ==================== Check authorization ====================
    if (!req.session.userid) {
        const message = "Not logged in"
        return res.status(403).json({ message });
    }
    // ============================================================

    if (!req.params.tweetId) {
        // ==================== Find all post for current user ====================
        Tweet.find({author: req.session.login}, function(err, docs) {
            if (err) {
                const message = "Internal Server Error 1";
                return res.status(500).json({ message });
            }
            return res.status(200).json(docs);
        });
        
        return;
    }

    Tweet.findOne({_id: req.params.tweetId}, function(err, docs) {
        if (err) {
            const message = "Internal Server Error 2";
            return res.status(500).json({ message });
        }
        return res.status(200).json(docs);        
    });
    return;
})

// ======================================== POST TWEET ========================================

router.post('/tweets', [
    check('content').notEmpty().withMessage('Tweet content must not be empty'),
    check('content').isLength({ max: 140 }).withMessage('Tweet length must be less than 140 characters'),
    ],
    function (req, res) {
    // ==================== Check authorization ====================
    if (!req.session.login) {
        const message = "Not logged in"
        return res.status(403).json({ message });
    }
    // ============================================================

    // Express validator errors
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        const infos = errors.errors;
        const message = infos[0].msg;
        return res.status(400).json({ message });
    }

    const newTweet = new Tweet({
        author: req.session.login,
        content: req.body.content,
        creationDate: new Date(),
    });

        newTweet.save(function (err) {
            if (err) {
                const message = "Internal Server Error";
                return res.status(500).json({ message });
            }
            const message = "Tweet created";
            return res.status(201).json({ message });
        })
})

// ======================================== UPDATE TWEET ========================================

router.put('/tweets/:tweetId', [
    check('content').notEmpty().withMessage('Tweet content must not be empty'),
    check('content').isLength({ max: 140 }).withMessage('Tweet length must be less than 140 characters'),
    ], function (req, res) {
    // ==================== Check authorization ====================
    if (!req.session.userid) {
        const message = "Not logged in"
        return res.status(403).json({ message });
    }
    // ============================================================

    // Express validator errors
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        const infos = errors.errors;
        const message = infos[0].msg;
        return res.status(400).json({ message });
    }

    // Updated data
    const updatedTweet = {}

    if (req.body.content) {
        updatedTweet.content = req.body.content;
    }

    Tweet.findOneAndUpdate({_id: req.params.tweetId}, updatedTweet, function (err, docs) {
        if (err) {
            const message = "Internal Server Error";
            return res.status(500).json({ message });
        }
        return res.status(200).json(docs);
    });
})

// ======================================== DELETE TWEET ========================================

router.delete('/tweets/:tweetId', function (req, res) {
    // ==================== Check authorization ====================
    if (!req.session.userid) {
        const message = "Not logged in"
        return res.status(403).json({ message });
    }
    // ============================================================

    Tweet.findOneAndDelete({_id: req.params.tweetId}, function (err, docs) {
        if (err) {
            const message = "Internal Server Error";
            return res.status(500).json({ message });
        }
        return res.status(200).json(docs);
    });
})

module.exports = router