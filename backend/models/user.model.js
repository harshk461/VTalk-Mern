const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true // Enforce uniqueness for username
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true // Enforce uniqueness for email
    },
    password: {
        type: String,
        required: true
    },
    dob: {
        type: Date,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = User = mongoose.model("users", UserSchema);
