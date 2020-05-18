"use strict"

// Packages
const express = require('express');
const bcrypt = require('bcrypt')
const router = express.Router();
const { check, validationResult } = require('express-validator');

// Model files
const User = require('../models/User')


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
        console.log("===== POST CREATE (admin) =====")
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
            admin: req.body.admin,
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

        newUser.save(function (err,user) {
            if (err) {
                return res.status(500).json("Internal Server Error");
            } else {
                return res.status(201).json({ user });
            }
        });
});


// ----------------------------------------------   r e a d   -------------------------------------------------- 
router.get(['/admin/users/:userid?'], function (req, res) {  ///admin/users : tested OK - /admin/users/<id> : tested OK
    //if admin
    // if (req.session.admin == (req.session.admin=="true")){
    const userid=req.params.userid;
    console.log("userid= ",userid);
        if (!userid){ 
            User.find(function (err, users) {  
                if (err) {
                    const message = "Internal Server Error"
                    return res.status(500).json({ message });
                }
                return res.status(200).json({ users });
            });
        }
        if(userid){
            User.findOne({_id:userid}, function (err, user) {  
                if (err) {
                    const message = "Internal Server Error"
                    return res.status(500).json({ message });
                }
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
                        return res.status(500).json({ message });
                    }
                    return res.status(200).json({ user });
                });
    }else{
        const message = "You can't access to this profile if is not yours";
        return res.status(400).json({ message });
    }
    
});     



// ----------------------------------------------   u p d a t e    -------------------------------------------------- 

router.put('/myprofile', async function (req, res) { // tested Opassword does'nt hashed
    //if user connected
    
        if (req.session.userid) {
            if ((req.body.password) && (req.body.password !== req.body.confirm_password) ) {
                const message = "Passwords do not match";
                return res.status(400).json({ message });
            }
            //put new data
            const updateUser = new User({
                login: req.body.login,
                email: req.body.email,
                password: req.body.password,
            });

            //update schema of User and db
            // console.log("--------------req.session.userid=", req.session.userid)// TEST CONSOLE
            // User.findOneAndUpdate({ _id:req.session.userid }, updateUser , function (err, user) {  
            //     if (err) {
            //         const message = "Internal Server Error"
            //         console.log("-------",message,"---------")// TEST CONSOLE
            //         return res.status(500).json({ message });
            //     }
            //     const message = "profil updated !" // TEST CONSOLE
            //     console.log("user=",user)// TEST CONSOLE
            //     console.log(message)// TEST CONSOLE
            //     req.session.login = user.login
            //     req.session.email = user.email
            //     return res.status(200).json({ user });
            // });


            // User.findOne({_id : req.session.userid}, function(err,user){
            //     if (err){
            //         const message = "Internal Server Error"
            //         console.log("-------",message,"---------")// TEST CONSOLE
            //         return res.status(500).json({ message });   
            //     }
            //     if (user){
            //         if(req.body.login){
            //             user.login = req.body.login;
            //         }
            //         if(req.body.password){
            //             user.password = updateUser.password;
            //             console.log(user.password);//TEST CONSOLE
            //         }
            //         console.log("***************** updateUser : ", updateUser)
            //         updateUser.save()
            //         return res.status(200).json({ user });  
            //     }
            // })


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
                return res.status(400).json({ message });
            } else if (isLoginExist !== false) {
                const message = "Internal Server Error";
                return res.status(500).json({ message });
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
                return res.status(400).json({message});
            } else if (isEmailExist !== false) {
                const message= "Internal Server Error"
                return res.status(500).json({message});
            }

            User.findById(req.session.userid,function(err,user){

                console.log("updated user:",user);
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
                        return res.status(400).json({message});
                    }
                } 
                user.save();
                return res.status(200).json({ user });  
            });

        }else{
            const message = "You can't update this profile if it is not yours";
            return res.status(400).json({ message });
        }
    });

    
    router.put('/admin/users/:userid', async function (req, res) { //tested ok
        const id = req.param.userid
        //if admin
        console.log(" admin/users/id: ",req.session.admin);
        if (req.session.admin == true){
            if ((req.body.password) && (req.body.password !== req.body.confirm_password) ) {
                const message = "Passwords do not match";
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
                    return res.status(400).json({ message });
                } else if (isLoginExist !== false) {
                    const message = "Internal Server Error";
                    return res.status(500).json({ message });
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
                    return res.status(400).json({message});
                } else if (isEmailExist !== false) {
                    const message= "Internal Server Error"
                    return res.status(500).json({message});
                }
            }
            User.findById(req.params.userid,function(err,user){

                console.log("updated user:",user);
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
                        return res.status(400).json({message});
                    }
                if(req.body.admin){
                    user.admin = req.body.admin;
                }
                } 
                user.save();
                const message = "User updated"
                return res.status(200).json({ message, updateUser });  
            });

        }else{
            const message = "You can't update this profile if you are not admin";
            return res.status(400).json({ message });
        }
    });


    
// ----------------------------------------------   d e l e t e    -------------------------------------------------- 
router.delete('/myprofile', function (req, res) { //tested ok
//if user connected
    if (req.session.userid) {
        //delete one
        console.log("id session:",req.session.userid)//test console

        User.findOneAndDelete({ _id:req.session.userid}, function (err, user) { 
            if (err) {
                const message = "Internal Server Error"
                return res.status(500).json({ message });
            }
            // Check user existence
            if (!user) {
                const message = "User not found";
                return res.status(400).json({ message });
            } else{
                const message = "User deleted";
                return res.status(200).json({ message, user });
            }
        });
    }else{
    const message = "You can't delete this profile if it is not yours";
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
                return res.status(500).json({ message });
            }
            // Check user existence
            if (!user) {
                const message = "User not found";
                return res.status(400).json({ message });
            } else {
                const message = "User deleted";
                return res.status(201).json({ message, user });
            }
        });  
    }else{
    const message = "You can't delete this profil if you're not admin";
    return res.status(400).json({ message });
    }
});


module.exports = router;
