"use strict"

// Packages
const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');

const mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);

// Model files
const Tweet = require('../models/Tweet')
const Hashtag = require('../models/Hashtag')
const HashtagRelation = require('../models/HashtagRelation')
const Followers = require('../models/Followers')

// Routes

// ======================================== GET TWEET(S) ========================================

router.get('/tweets/:tweetId?', function (req, res) {

    // ==================== Check authorization ====================
    if (!req.session.userid) {
        const message = "Not logged in"
        return res.status(403).json({ message });
    }
    // ============================================================

    if (!req.params.tweetId) {
        console.log("followerId: ", req.session.userid)
        // ==================== Find all post for current user ====================
        Followers.find({ $and: [{followerId: req.session.userid}, {blocked: false}]}, function(err, leaders) {
            if (err) {
                const message = "Internal Server Error 1";
                console.log(message);
                return res.status(500).json({ message });
            }
            // ==================== Query build ====================
            let query = { $or: [{ author: req.session.login }] };
            if (leaders.length > 0) {
                leaders.forEach(leader => {
                    let led = {author: leader.leaderLogin};
                    query.$or.push(led);
                });
            }
            console.log("ici query", query);

            Tweet.find(query, function(err, docs) {
                if (err) {
                    const message = "Internal Server Error 2";
                    return res.status(500).json({ message });
                }
                return res.status(200).json(docs);
            });
        });
        return;
    }

    Tweet.findOne({_id: req.params.tweetId}, function(err, docs) {
        if (err) {
            const message = "Internal Server Error Tweet FindOne";
            return res.status(500).json({ message });
        }
        return res.status(200).json(docs);        
    });
    return;
})

// ======================================== GET TWEET(S) BY HASHTAG========================================

router.get('/hashtag/:hashtag', async function (req, res) {
    // ==================== Check authorization ====================
    if (!req.session.userid) {
        const message = "Not logged in"
        return res.status(403).json({ message });
    }
    // ============================================================
    const hashtagString = "#" + req.params.hashtag;
    console.log(hashtagString);

    const hashtag = await Hashtag.find({content: hashtagString});
    console.log("----------------- hashtag look ----------", hashtag);

    if (!hashtag[0]) {
        const message = "Bad request";
        return res.status(400).json({ message });
    }
    console.log("hashtag en relation :", hashtag[0]._id);

    const tweetsWithHashtag = await HashtagRelation.find({hashtagId: hashtag[0]._id});
    console.log("tweets en relation avec le hashtag :", tweetsWithHashtag);

    Followers.find({ $and: [{followerId: req.session.userid}, {blocked: false}]}, function(err, leaders) {
        if (err) {
            const message = "Internal Server Error 1";
            console.log(message);
            return res.status(500).json({ message });
        }
        // ==================== Query build part one : leaders ====================
        let leadersQuery = { $or: [{ author: req.session.login }] };
        if (leaders.length > 0) {
            leaders.forEach(leader => {
                let led = {author: leader.leaderLogin};
                leadersQuery.$or.push(led);
            });
        }
        console.log("leadersQuery :", leadersQuery);

        // ==================== Query build part two : hashtags ====================
        let hashtagQuery = { $or: [] };
        if (tweetsWithHashtag.length > 0) {
            tweetsWithHashtag.forEach(tweetWithHashtag => {
                let led = {_id: tweetWithHashtag.tweetId};
                hashtagQuery.$or.push(led);
            });
        }
        console.log("hashtagQuery", hashtagQuery);

        let bigQuery = { $and: [] };
        if (leadersQuery) {
            bigQuery.$and.push(leadersQuery);
        }
        if (hashtagQuery) {
            bigQuery.$and.push(hashtagQuery);
        }

        console.log("bigQuery", bigQuery);

        Tweet.find(bigQuery, function(err, docs) {
            if (err) {
                const message = "Internal Server Error 2";
                return res.status(500).json({ message });
            }
            return res.status(200).json(docs);
        });
    });
    return;
})

router.get('/mytweets', async function (req, res) {

    // ==================== Check authorization ====================
    if (!req.session.userid) {
        const message = "Not logged in"
        return res.status(403).json({ message });
    }
    // ==================== Find all post for current user ====================
    Tweet.find({ author: req.session.login }, function (err, docs) {
        if (err) {
            const message = "Internal Server Error tweets/:login";
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
    async function (req, res) {
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

    let error = "";

    const newTweet = new Tweet({
        author: req.session.login,
        content: req.body.content,
        creationDate: new Date(),
    });

    // ========== Get array of hashtags ==========
    const myHashtags = findHashtag(req.body.content);
    console.log("array of hashtags :", myHashtags);

    // ========== Get an array of hashtags IDs ==========
    let hashtagsId = [];

    if (myHashtags) {
        console.log("myHashtags.length >>>>>>>>>>>>>>>>>>>>>", myHashtags.length)
    } else {
        console.log("passe ta route >>>>>>>>>>>>>>>>>>>><")
    }

    if (myHashtags) {
        for (const hashtag of myHashtags) {
        // myHashtags.for( async (hashtag) => {

            const hashtagInDB = await Hashtag.find({content: hashtag});

            if (hashtagInDB[0]) {
                console.log("1. hashtagInDB[0] : ", hashtagInDB[0])
                hashtagsId.push(hashtagInDB[0]._id);
            } else {
                console.log("2. !hashtagInDB[0] : ", hashtagInDB[0])
                //========== Save hashtag in DB ==========
                const newHashtag = new Hashtag({
                    content: hashtag
                });
                const newHashtagInDB = await newHashtag.save()
                    .then((hashtagAdded) => {
                        console.log("hashtag added"); 
                        hashtagsId.push(hashtagAdded._id);
                    })
                    .catch(error => {
                        console.log("error");
                    })
            }

            console.log("temp list : ", hashtagsId);

        }
        console.log("+++++++++++++++++++", hashtagsId);
    }

    

    // ========== Save tweet in DB and get the tweet ID ==========
    const tweet = await newTweet.save()
        .then((tweet) => {
            return tweet;
        })
        .catch((err) => {
            error = err;
            const message = "Internal Server Error";
            return res.status(500).json({ message });
        });
    
    console.log("tweet_id : ", tweet._id);


    // ========== Save hashtag relations in DB and returns message for user ==========
    // hashtagsId = ["5ecd217f5f9d8022f8311ccd", 
                    //   "5ecd217f5f9d8022f8311ccc",
                    //   "5ecd217f5f9d8022f8311cce"]


    

    // ========== Link tweet ID with hashtags IDs ==========

    if (hashtagsId) {

        for (const hashtagId of hashtagsId) {
        // hashtagsId.forEach( async (hashtagId) => {
            const newHashtagRelation = new HashtagRelation({
                hashtagId: hashtagId,
                tweetId: tweet._id,
            });
            await newHashtagRelation.save()
                .then((response) => {
                    console.log("response from hashtag relation", response);
                })
                .catch((error) => {
                    error = "error in hashtag relation";
                    console.log("error in hashtag relation", error);
                })
        }
    }

    if (!error) {
        const message = "Tweet correctly added";
        return res.status(200).json({ message });
    }
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

router.delete('/tweets/:tweetId', async function (req, res) {
    console.log("===== HERE IN DELETE TWEET =====");
    // ==================== Check authorization ====================
    if (!req.session.userid) {
        const message = "Not logged in"
        return res.status(403).json({ message });
    }
    // ============================================================

    // ====================== DELETE HASHTAG RELATIONS IF EXIST ======================

    const hashtagRelations = await HashtagRelation.find({tweetId: req.params.tweetId});

    if (hashtagRelations[0]) {
        // ==================== Query build to remove relations ====================
        let hashtagRelationsToDeleteQuery = { $or: [] };
        if (hashtagRelations.length > 0) {
            hashtagRelations.forEach(relation => {
                let led = {_id: relation._id};
                hashtagRelationsToDeleteQuery.$or.push(led);
            });
        }
        console.log("***************hashtagRelationsToDeleteQuery", hashtagRelationsToDeleteQuery);

        await HashtagRelation.deleteMany(hashtagRelationsToDeleteQuery, function(err, res) {
            if (err) {
                console.log("Error when destroying relations between hashtags and tweet")
            }
            console.log("Relations between hashtags and tweet destroyed")
        })

    }

    console.log("hashtagRelations when DELETE tweet :", hashtagRelations);

    // ====================== DELETE TWEET ======================

    Tweet.findOneAndDelete({_id: req.params.tweetId}, function (err, docs) {
        if (err) {
            const message = "Internal Server Error";
            return res.status(500).json({ message });
        }
        return res.status(200).json(docs);
    });
})

function findHashtag(content) {
    const regEx = /#[À-úa-z0-9]*/g;
    return content.match(regEx);
}

module.exports = router