const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const User = require('../../models/user.model');
const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');

const registerController = (req, res) => {
    const { errors, isValid } = validateRegisterInput(req.body);

    if (!isValid) {
        console.log(errors);
        return res.status(400).json(errors);
    }

    User.findOne({ $or: [{ email: req.body.email }, { username: req.body.username }] })
        .then(user => {
            if (user) {
                return res.json({ status: "error", message: "Email or Username Already Exists" });
            } else {
                const newUser = new User({
                    username: req.body.username,
                    name: req.body.name,
                    email: req.body.email,
                    password: req.body.password,
                    dob: req.body.dob,
                });

                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if (err) throw err;
                        newUser.password = hash;
                        newUser
                            .save()
                            .then(savedUser => res.json(savedUser))
                            .catch(saveErr => res.status(500).json({ status: "error", message: "Internal Server Error" }));
                    });
                });
            }
        })
        .catch(err => res.status(500).json({ status: "error", message: "Internal Server Error" }));
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

const getUser = async (req, res) => {
    const providedUsername = req.params.user;

    try {
        const users = await User.find({ username: { $regex: new RegExp(providedUsername, 'i') } });

        if (!users || users.length === 0) {
            return res.json({ status: "not-found", message: "Users not found" });
        }

        return res.json(users);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ status: "error", message: "Internal Server Error" });
    }
};

module.exports = {
    registerController,
    loginController,
    getUser,
};
