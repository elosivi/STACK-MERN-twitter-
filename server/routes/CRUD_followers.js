"use strict"

// Packages
const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');

const mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);

const ObjectId = mongoose.Types.ObjectId;

// Model files
const Followers = require('../models/Followers')
const User = require('../models/User')

// Routes

//to know who follow me (my folowers)      ----> get /myfollowers                  -----> TESTS OK
//to remember me who I follow (my leaders) ----> get /myleaders                    -----> TESTS OK
//to follow someone (a leader)             ----> post /myleader/leaderid           -----> TESTS OK
//to stop to follow someone (a leader)     ----> delete /myleader/leaderid         -----> TESTS OK
//to block somenone ( a follower)          ----> put /blockFollower/followerid
//to unblock somenone ( a follower)        ----> put /unblockFollower/followerid

// ***************** WHAT HAPPEN IF AN USER DELETE HIS PROFIL..... to test ********* //

// ======================================== GET LEADERS / FOLLOWERS ========================================

router.get('/myfollowers', async function (req, res) { 

    if (!req.session.userid) {
        const message = "Not logged in"
        console.log(message)
        return res.status(403).json({ message });
    }


    Followers.find({leaderId: req.session.userid}, function(err, followers) {
        if (err) {
            const message = "Internal Server Error";
            console.log(" ==> ERROR !(message from server) Followers: you try to find all your followers but we have an: "+ message+ " more info: "+err)
            return res.status(500).json({ message });
        }
        console.log("==> YES ! (message from server) Followers: you get all your followers ")
        return res.status(200).json(followers);        
    });
    return;
})

router.get('/myleaders', async function (req, res) { 
    if (!req.session.userid) {
        const message = "Not logged in"
        console.log(message)
        return res.status(403).json({ message });
    }

    Followers.find({followerId: req.session.userid}, function(err, follows) {
        if (err) {
            const message = "Internal Server Error";
            console.log("==> ERROR !(message from server) Followers: you try to find all your leaders but we have an: "+ message+ " more info: "+err)
            return res.status(500).json({ message });
        }
        console.log("==> YES! (message from server) Followers: you get all your leaders")
        return res.status(200).json(follows);        
    });
    return;
})

// ======================================== POST LEADER (to follow someone) ========================================

router.post('/myleaders/:leaderid', function (req, res) { 

    const leader_id =req.params.leaderid;

    if (!req.session.login) {
        const message = "Not logged in"
        console.log(message)
        return res.status(403).json({ message });
    }
    //verify if relation already exist
    console.log(req.session.userid+" want follow "+ leader_id )
    Followers.findOne( {$and:[ {leaderId: leader_id},{followerId:req.session.userid}]}, function (err, follow) { 
        if (err) {
            const message = "Internal Server Error"
            console.log("==> ERROR !(message from server) Followers: you try to follow somebody, we are verifiying if this relationship already exist but we have an: "+ message+ " more info: "+err)
            return res.status(500).json({ message });
        } 
        if (follow) {
            const message ="you are already following "+follow.leaderLogin
            console.log("==> NO ! (message from server) Followers: "+ message)
            return res.status(403).json({message});
            
        } else {
            // relation don't exist yet, find leader login 
            User.findOne({_id:req.params.leaderid}, function (err, user) {  
                if (err) {
                    const message = "Internal Server Error"
                    console.log("==> ERROR !(message from server) Followers: you try to find the login of the leader you want to follow but : "+ message+ " more info: "+err)
                    return res.status(500).json({ message });
                }
                const leader_login = user.login

                //save the new relationship in followers collection
                const newLeader = new Followers({
                    leaderId: req.params.leaderid, //user I want to follow (his id)
                    leaderLogin: leader_login,//user I want to follow (his login)
                    followerId: req.session.userid, //my userid
                    followerLogin: req.session.login, //my login
                    blocked: false,
                    creationDate: new Date(),   
                });
            
                newLeader.save(function (err) {
                    if (err) {
                        const message = "Internal Server Error";
                        console.log("==> ERROR !(message from server) Followers: you try to follow somebody but we have an: "+ message+ " more info: "+err)
                        return res.status(500).json({ message });
                    }
                    const message = "Now, you follow: "+leader_login;
                    console.log("==> YES !(message from server) Followers: "+ message + newLeader);
                    return res.status(201).json({ message });
                })

            });
        }

    })

});  


// ======================================== UPDATE FOLLOW (block or unblock a follower) ========================================

router.put('/blockFollower/:followerId', function (req, res) {

    if (!req.session.userid) {
        const message = "Not logged in"
        console.log(message)
        return res.status(403).json({ message });
    }

    const blockFollower = {
        blocked: true,
        updateDate : new Date(),
    }

    Followers.findOneAndUpdate({$and:[ {leaderId: req.session.userid},{followerId:req.params.followerId} ]}, blockFollower, function (err, follow) {
        if (err) {
            const message = "Internal Server Error";
            console.log("==> ERROR !(message from server) Followers: you try to block a follower but we have an: "+ message+ " more info: "+err)
            return res.status(500).json({ message, err });
        }
        if(!follow){
            const message = "we did not find this follower in your relationships, sorry..."
            console.log("==> NO! (message from server) Followers: "+ message)
            console.log(req.params.followerId+ "don't follow: "+ req.session.userid )
            return res.status(403).json({message});
        }
        console.log("==> YES !(message from server) Followers: "+ follow+ " is BLOCKED (he can't follow you anymore)");
        return res.status(200).json(follow);
    });
})

router.put('/unblockFollower/:followerId', function (req, res) {
    if (!req.session.userid) {
        const message = "Not logged in"
        console.log(message)
        return res.status(403).json({ message });
    }

    const blockFollower = new Followers({
        blocked: false,
        updateDate : new Date(),
    });

    Followers.findOneAndUpdate({$and:[ {leaderId: req.session.userid},{followerId:req.params.followerId} ]}, blockFollower, function (err, follow) {
        if (err) {
            const message = "Internal Server Error";
            console.log("==> ERROR !(message from server) Followers: you try to unblock a follower but :"+ message)
            return res.status(500).json({ message });
        }
        console.log("==> YES !(message from server) Followers: " + follow.followerLogin + " is UNBLOCKED (he can follow you again)")
        return res.status(200).json(follow);
    });
})

// ======================================== DELETE A FOLLOW (stop to follow someone - a leader) ========================================

router.delete('/myleaders/:leaderId', function (req, res) {
    if (!req.session.userid) {
        const message = "Not logged in"
        console.log(message)
        return res.status(403).json({ message });
    }

    Followers.findOneAndDelete({$and:[ {leaderId: req.params.leaderId},{followerId:req.session.userid} ]}, function (err, follow) {
        if (err) {
            const message = "Internal Server Error";
            console.log("==> ERROR !(message from server) Followers: you try to delete a relationship in collection followers but :"+ message)
            return res.status(500).json({ message });
        }
        if (!follow){
            const message = follow.leaderLogin+" is not one of your leaders"
            console.log("==> NO LEADER FOUND! (message from server) Followers: you try to delete a relation ship in collection followers but :"+ message)
        return res.status(403).json({message});
        }
        const message ="You don't follow "+follow.leaderLogin+" anymore"
        console.log("==> YES ! (message from server) Followers: "+ message)
        return res.status(200).json({message});
    });
})

module.exports = router