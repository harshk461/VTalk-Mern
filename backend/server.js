// Import required modules
const express = require('express');

// Create an instance of the express app
const app = express();

const bodyParser = require('body-parser');
const path = require('path');
const auth = require('./routes/auth/Auth');
const contact = require('./routes/contact/contact');
const PORT = process.env.PORT || 5000;
const connectDB = require('./config/db');
const passport = require('passport');
const cors = require('cors');
const server = require('http').createServer(app);

app.use(cors());
// Passport middleware
app.use(passport.initialize());
// Passport config
require("./config/passport")(passport);

//middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Connect to the database
connectDB();

// Routes
app.get('/', (req, res) => {
    res.send('Hello, World!');
});

// Routes
app.use("/auth", auth);
app.use('/contact', contact);

server.listen(PORT, () => {
    console.log(`Server Connected PORT ${PORT}`);
})
