const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ChatModel = new Schema({
    contactID: {
        type: String,
        unique: true,
        required: true,
    },
    users: [
        {
            user1: {
                type: String,
            },
            user2: {
                type: String,
            }
        }
    ],
    messages: [
        {
            sender: {
                type: String,
            },
            message: {
                type: String,
                required: true
            },
            timestamp: {
                type: Date,
                default: Date.now
            }
        }
    ],
});

module.exports = Chat = mongoose.model("chats", ChatModel);