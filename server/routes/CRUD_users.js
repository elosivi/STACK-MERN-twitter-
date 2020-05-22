"use strict"

// Packages
const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');

// Model files
const User = require('../models/User')

//to create my profil           ----> get /myfollowers                  -----> TESTS OK
//to create an user if admin    ----> get /admin/users                  -----> TESTS OK

// ----------------------------------------------   c r e a t e    -------------------------------------------------- 

router.post('/admin/users',[ // test OK
    check('login').notEmpty().withMessage('Login must not be empty'),
    check('login').isLength({ min: 5 }).withMessage('Login length must be more than 5 characters'),
    check('login').isLength({ max: 20 }).withMessage('Login length must be less than 20 characters'),
    check('email').notEmpty().withMessage('Email must not be empty'),
    check('email').isEmail().withMessage('Email must be at email format'),
    check('password').notEmpty().withMessage('Password must not be empty'),
    check('confirm_password').notEmpty().withMessage('Password confirmation must not be empty')
    ], async function (req, res) {
//if admin
        console.log("==> OK! (mess from server) Users: /admin/users received this post: ")
        console.log(req.is())
        console.log(req.body)

        // Express validator errors
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            const infos = errors.errors;
            console.log("==> ERROR ! (mess from server) Users: " + infos)
            return res.status(400).json({ message: infos[0].msg });
        }

        // Check password confirmation match
        if (req.body.password !== req.body.confirm_password) {
            const message = "Passwords do not match";
            console.log(message)
            return res.status(400).json({ message });
        }

        // Make the new User before insert into DB
        const newUser = new User({
            login: req.body.login,
            email: req.body.email,
            password: req.body.password,
            admin: req.body.admin,
        });

        // Check if login already exists in DB
        const isLoginExist = await User.exists({ login: newUser.login })
            .then((isLogin) => {
                return isLogin;
            })
            .catch((error) => {
                console.log("==> ERROR! (mess from server) Users: verify is login allready exist but: " +error)
                return error;
            })
            if (isLoginExist === true) {
                const message = "This login already exists";
                console.log("==> NO ! (mess from server) Users: "+message)
                return res.status(400).json({ message });
            } else if (isLoginExist !== false) {
                const message = "Internal Server Error";
                console.log("==> ERROR ! (mess from server) Users: "+message )
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
            const message = "This email already exists"
            console.log("==> NO ! (mess from server) Users: "+message )
            return res.status(400).json({message});
        } else if (isEmailExist !== false) {
            const message = "Internal Server Error"
            console.log("==> ERROR ! (mess from server) Users: "+message )
            return res.status(500).json({message});
        }

        newUser.save(function (err,user) {
            if (err) {
                const message = "Internal Server Error"
                console.log("==> ERROR ! (mess from server) Users: "+message )
                return res.status(500).json({message});
            } else {
                console.log("==> YES ! (mess from server) Users: user saved : "+ user)
                return res.status(201).json({ user });
            }
        });
});


// ----------------------------------------------   r e a d   -------------------------------------------------- 
router.get(['/admin/users/:userid?'], function (req, res) {  ///admin/users : tested OK - /admin/users/<id> : tested OK
    //if admin
    // if (req.session.admin == (req.session.admin=="true")){
    const userid=req.params.userid;
        if (!userid){ 
            User.find(function (err, users) {  
                if (err) {
                    const message = "Internal Server Error"
                    console.log("==> ERROR ! (mess from server) Users: "+message )
                    return res.status(500).json({message});
                }
                console.log("==> YES ! (mess from server) Users: get all users from admin status ")
                return res.status(200).json({ users });
            });
        }
        if(userid){
            User.findOne({_id:userid}, function (err, user) {  
                if (err) {
                    const message = "Internal Server Error"
                    console.log("==> ERROR ! (mess from server) Users: "+message )
                    return res.status(500).json({message});
                }
                console.log("==> YES ! (mess from server) Users: find one user : "+ user.login)
                return res.status(200).json({ user });
            });
        }
    // }
});


router.get(['/myprofile'], function (req, res) { // Tested OK
    //if user connected
    if (req.session.userid) {
        //data of user's profil connected
        User.findOne({_id:req.session.userid}, function (err, user) {  
                    if (err) {
                        const message = "Internal Server Error"
                        console.log("==> ERROR ! (mess from server) Users: "+message )
                        return res.status(500).json({message});
                    }
                    console.log("==> YES ! (mess from server) Users: find my profile : "+ user.login)
                    return res.status(200).json({ user });
                });
    }else{
        const message = "You can't access to this profile if is not yours";
        console.log("==> NO ! (mess from server) Users: "+message)
        return res.status(400).json({ message });
    }
    
});     



// ----------------------------------------------   u p d a t e    -------------------------------------------------- 

router.put('/myprofile', async function (req, res) { // tested Opassword does'nt hashed
    //if user connected
    
        if (req.session.userid) {
            if ((req.body.password) && (req.body.password !== req.body.confirm_password) ) {
                const message = "Passwords do not match";
                console.log("==> NO ! (mess from server) Users: try to update my profile but "+message)
                return res.status(400).json({ message });
            }
            //put new data
            const updateUser = new User({
                login: req.body.login,
                email: req.body.email,
                password: req.body.password,
            });

            // Check if login already exists in DB
            const isLoginExist = await User.exists({ login: updateUser.login })
                .then((isLogin) => {
                    return isLogin;
                })
                .catch((error) => {
                    return error;
                })
            if (isLoginExist === true) {
                const message = "This login already exists";
                console.log("==> NO ! (mess from server) Users: try to update my profile but "+message)
                return res.status(400).json({ message });
            } else if (isLoginExist !== false) {
                const message = "Internal Server Error"
                console.log("==> ERROR ! (mess from server) Users: "+message )
                return res.status(500).json({message});
            }

            // Check if email already exists in DB
            const isEmailExist = await User.exists({ email: updateUser.email })
                .then((isEmail) => {
                    return isEmail;
                })
                .catch((error) => {
                    return error;
                })

            if (isEmailExist === true) {
                const message = "This email already exists"
                console.log("==> NO ! (mess from server) Users: try to update my profile but "+message)
                return res.status(400).json({message});
            } else if (isEmailExist !== false) {
                const message = "Internal Server Error"
                console.log("==> ERROR ! (mess from server) Users: "+message )
                return res.status(500).json({message});
            }

            User.findById(req.session.userid,function(err,user){
                if(req.body.login){
                    user.login = req.body.login;
                }
                if(req.body.password){
                    user.password = req.body.password;
                }
                if(req.body.email){
                    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(req.body.email)){
                        user.email = req.body.email;
                    }else{
                        const message="email is not valid"
                        console.log("==> NO ! (mess from server) Users: try to update my profile but "+message)
                        return res.status(400).json({message});
                    }
                } 
                user.save();
                console.log("==> YES ! (mess from server) Users: my profile is updated "+user)
                return res.status(200).json({ user });  
            });

        }else{
            const message = "You can't update this profile if it is not yours";
            console.log("==> NO ! (mess from server) Users: "+message)
            return res.status(400).json({ message });
        }
    });

    
    router.put('/admin/users/:userid', async function (req, res) { //tested ok
        const id = req.param.userid
        //if admin
        if (req.session.admin == true){
            if ((req.body.password) && (req.body.password !== req.body.confirm_password) ) {
                const message = "Passwords do not match";
                console.log("==> NO ! (mess from server) Users: Admin try to update a profile but "+message)
                return res.status(400).json({ message });
            }
            //put new data
            const updateUser = new User({
                login: req.body.login,
                email: req.body.email,
                password: req.body.password,
                admin : req.body.admin,
            });
            
            // Check if login already exists in DB
            if(req.body.login){
                const isLoginExist = await User.exists({ login: updateUser.login })
                    .then((isLogin) => {
                        return isLogin;
                    })
                    .catch((error) => {
                        return error;
                    })
                if (isLoginExist === true) {
                    const message = "This login already exists";
                    console.log("==> NO ! (mess from server) Users: Admin try to update a profile but "+message)
                    return res.status(400).json({ message });
                } else if (isLoginExist !== false) {
                    const message = "Internal Server Error"
                    console.log("==> ERROR ! (mess from server) Users: "+message )
                    return res.status(500).json({message});
                }
            }

            // Check if email already exists in DB
            if(req.body.email){
                const isEmailExist = await User.exists({ email: updateUser.email })
                    .then((isEmail) => {
                        return isEmail;
                    })
                    .catch((error) => {
                        return error;
                    })

                if (isEmailExist === true) {
                    const message = "This email already exists"
                    console.log("==> NO ! (mess from server) Users: Admin try to update a profile but "+message)
                    return res.status(400).json({message});
                } else if (isEmailExist !== false) {
                    const message = "Internal Server Error"
                    console.log("==> ERROR ! (mess from server) Users: "+message )
                    return res.status(500).json({message});
                }
            }
            User.findById(req.params.userid,function(err,user){
                if(req.body.login){
                    user.login = req.body.login;
                }
                if(req.body.password){
                    user.password = req.body.password;
                }
                if(req.body.email){
                    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(req.body.email)){
                        user.email = req.body.email;
                    }else{
                        const message="email is not valid"
                        console.log("==> NO ! (mess from server) Users: Admin try to update a profile but "+message)
                        return res.status(400).json({message});
                    }
                    if(req.body.admin){
                        user.admin = req.body.admin;
                    }
                } 
                user.save();
                const message = "User updated"
                console.log("==> YES ! (mess from server) Users: "+ message + updateUser)
                return res.status(200).json({ message, updateUser });  
            });

        }else{
            const message = "You can't update this profile if you are not admin";
            console.log("==> NO ! (mess from server) Users: "+message)
            return res.status(400).json({ message });
        }
    });


    
// ----------------------------------------------   d e l e t e    -------------------------------------------------- 
router.delete('/myprofile', function (req, res) { //tested ok
//if user connected
    if (req.session.userid) {
        //delete one

        User.findOneAndDelete({ _id:req.session.userid}, function (err, user) { 
            if (err) {
                const message = "Internal Server Error"
                console.log("==> ERROR ! (mess from server) Users: "+message )
                return res.status(500).json({message});
            }
            // Check user existence
            if (!user) {
                const message = "User not found";
                console.log("==> NO ! (mess from server) Users: try to delete my profile but "+message)
                return res.status(400).json({ message });
            } else{
                const message = "User deleted";
                console.log("==> YES ! (mess from server) Users: "+message)
                return res.status(200).json({ message, user });
            }
        });
    }else{
    const message = "You can't delete this profile if it is not yours";
    console.log("==> NO ! (mess from server) Users: "+message)
    return res.status(400).json({ message });
    }
});


router.delete('/admin/users/:userid', function (req, res) { // tested ok
//if admin
    const id = req.params.userid
    if (req.session.admin == true){
        //delete one
        User.findOneAndDelete({ _id: id }, function (err, user) {
            if (err) {
                const message = "Internal Server Error"
                console.log("==> ERROR ! (mess from server) Users: "+message )
                return res.status(500).json({message});
            }
            // Check user existence
            if (!user) {
                const message = "User not found";
                console.log("==> NO ! (mess from server) Users: Admin try to delete a profile but "+message)
                return res.status(400).json({ message });
            } else {
                const message = "User deleted";
                console.log("==> YES ! (mess from server) Users: "+message+" by an admin")
                return res.status(201).json({ message, user });
            }
        });  
    }else{
    const message = "You can't delete this profil if you're not admin";
    console.log("==> NO ! (mess from server) Users: "+message)
    return res.status(400).json({ message });
    }
});


module.exports = router;
