const Chat = require('../../models/message.model');

async function sendMessage(data) {
    const { user1, user2, contactID, message, sender } = data;
    const chatAlreadyExists = await Chat.findOne({ contactID: contactID });

    if (!chatAlreadyExists) {
        try {
            const newChat = new Chat({
                contactID: contactID,
                users: { user1, user2 },
                messages: { sender, message },
            });

            await newChat.save();
            console.log("Success");
            return { status: "success", message: "sent" };
        } catch (e) {
            console.log("error");
            return { status: "error", message: "Server Error" };
        }
    } else {
        try {
            chatAlreadyExists.messages.push({ sender, message });
            await chatAlreadyExists.save();
            return { status: "success", message: "sent" };
        } catch (e) {
            return { status: "error", message: "Server Error" };
        }
    }
}

const GetMessage = (contactID) => {
    return new Promise((resolve, reject) => {
        Chat.find({ contactID }).sort()
            .then((chats) => {
                if (!chats || chats.length === 0) {
                    resolve({ status: "Contact Not found", messages: [] });
                    return;
                }

                // Assuming you want to get messages from the first chat in the array
                const messages = chats[0].messages || [];

                resolve({ status: "success", messages });
            })
            .catch((error) => {
                console.error("Error retrieving messages:", error);
                resolve({ status: "error", message: "Server Error" });
            });
    });
};

module.exports = {
    sendMessage,
    GetMessage,
}