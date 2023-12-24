const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const User = require('../../models/user.model');
const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');

const registerController = (req, res) => {
    const { errors, isValid } = validateRegisterInput(req.body);

    if (!isValid) {
        return res.json(errors);
    }

    User.findOne({ email: req.body.email })
        .then(user => {
            if (user) {
                return res.status(404).json({ status: "error", email: "Email Already Exists" });
            } else {
                const newUser = new User({
                    username: req.body.username,
                    name: req.body.name,
                    email: req.body.email,
                    password: req.body.password,
                });

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
};

const loginController = (req, res) => {
    const { error, isValid } = validateLoginInput(req.body);

    if (!isValid) {
        return res.status(400).json({ status: "error", message: "Enter Valid Fields" });
    }

    const email = req.body.email;
    const password = req.body.password;

    User.findOne({ email })
        .then(user => {
            if (!user) {
                return res.status(404).json({ status: "error", message: "Email not found" });
            }

            bcrypt.compare(password, user.password)
                .then(isMatch => {
                    if (isMatch) {
                        const payload = {
                            id: user.id,
                            name: user.name,
                            email: user.email,
                            username: user.username,
                        };

                        jwt.sign(
                            payload,
                            keys.secretOrKey,
                            {
                                expiresIn: 31556926,
                            },
                            (err, token) => {
                                return res.status(200).json({
                                    status: "success",
                                    username: user.username,
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
};

module.exports = {
    registerController,
    loginController,
};
