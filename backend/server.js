// Import required modules
const express = require('express');

// Create an instance of the express app
const app = express();
const http = require('http');
const bodyParser = require('body-parser');
const path = require('path');
const auth = require('./routes/auth/Auth');
const contact = require('./routes/contact/contact');
const chat = require('./routes/chat/chat');
const PORT = process.env.PORT || 5000;
const connectDB = require('./config/db');
const passport = require('passport');
const cors = require('cors');
// const { Server } = require('socket.io');

const server = http.createServer(app);

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
app.use("/chat", chat);

const io = require('socket.io')(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ['GET', 'POST'],
        credentials: true
    }
});
io.on("connection", (socket) => {
    console.log("A user connected:", socket.id);
    socket.on("join_room", (roomId) => {
        socket.join(roomId);
        console.log(`user with id-${socket.id} joined room - ${roomId}`);
    });

    socket.on("send_msg", (data) => {
        console.log(data, "DATA");
        // console.log("Room ID", roomId);
        //This will send a message to a specific room ID
        io.in(data.roomId).emit("receive_msg", data);
    });

    socket.on("disconnect", () => {
        console.log("A user disconnected:", socket.id);
    });
});

server.listen(PORT, () => {
    console.log(`Server Connected PORT ${PORT}`);
})
