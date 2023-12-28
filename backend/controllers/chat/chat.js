const Chat = require('../../models/message.model');

const SendMessage = async (req, res) => {
    const { user1, user2, contactID, message, sender } = req.body;
    const ChatAlreadyExists = await Chat.findOne({ contactID: contactID });

    if (!ChatAlreadyExists) {
        const newChat = new Chat({
            contactID: contactID,
            users: { user1, user2 },
            messages: { sender, message },
        });

        newChat.save();
    }

    return res.json({ "jds": "djh" });
}

const GetMessage = async (req, res) => {
    const { contactID } = req.params;
    const chats = await Chat.find({ contactID });
    if (!chats) {
        return res.json({ "status": "Contact Not found" });
    }

    return res.json(chats[0].messages);
}

module.exports = {
    SendMessage,
    GetMessage
}