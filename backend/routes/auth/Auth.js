const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const keys = require('../../config/keys')

//load input validation
const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require("../../validation/login");

// Load User model
const User = require('../../models/user.model');


//Route for register data
router.post("/register", (req, res) => {
    //form Validation
    const { errors, isValid } = validateRegisterInput(req.body);

    //check validation
    if (!isValid) {
        return res.json(errors);
    }

    User.findOne({ email: req.body.email })
        .then(user => {
            if (user) {
                return res.status(404).json({ status: "error", email: "Email Already Exists" });
            } else {
                const newUser = new User({
                    name: req.body.name,
                    email: req.body.email,
                    password: req.body.password,
                });

                //hash password before saving in database
                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if (err) throw err;
                        newUser.password = hash;
                        newUser
                            .save()
                            .then(user => { return res.json(user) })
                            .catch(err => console.log(err));
                    });
                });
            }
        });
});



//Route for login route
router.post('/login', (req, res) => {
    //form validation
    const { error, isValid } = validateLoginInput(req.body);

    //check for validation
    if (!isValid) {
        return res.status(400).json({ status: "error", message: "Enter Valid Fields" });
    }

    const email = req.body.email;
    const password = req.body.password;

    //find user by email
    User.findOne({ email })
        .then(user => {
            //check if user exists
            if (!user) {
                return res.status(404).json({ status: "error", message: "Email not found" });
            }

            //check password
            bcrypt.compare(password, user.password)
                .then(isMatch => {
                    if (isMatch) {
                        //User matched
                        //create JWT Payload
                        const payload = {
                            id: user.id,
                            name: user.name,
                            email: user.email,
                        };

                        //sign token
                        jwt.sign(
                            payload,
                            keys.secretOrKey,
                            {
                                expiresIn: 31556926,//1 year in seconds
                            },
                            (err, token) => {
                                return res.status(200).json({
                                    status: "success",
                                    name: user.name,
                                    email: user.email,
                                    token: token
                                });
                            });
                    } else {
                        return res.status(404).json({ status: "error", message: "Password is Incorrect" });
                    }
                });
        });
});

module.exports = router;