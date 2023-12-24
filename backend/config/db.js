const mongoose = require('mongoose');
const MongoURL = require('./keys').mongoURI;

const connectDB = () => {
    mongoose.connect(MongoURL)
        .then(() => console.log("Database connected"))
        .catch(err => console.log(err.message));
}

module.exports = connectDB;