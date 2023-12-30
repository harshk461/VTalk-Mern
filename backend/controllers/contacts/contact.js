const Contacts = require('../../models/contact.model');

const getContacts = async (req, res) => {
    const username = req.params.user;
    // console.log(username);
    try {
        const userContacts = await Contacts.findOne({ 'user_id': username });
        // console.log(userContacts);
        if (!userContacts || !userContacts.contacts || userContacts.contacts.length === 0) {
            return res.status(200).json([]);
        }
        return res.status(200).json(userContacts.contacts);
    } catch (error) {
        console.error('Error retrieving contacts:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};


const addContacts = async (req, res) => {
    const user_id = req.params.user;
    const { username, name, name2 } = req.body;

    // Combine user_id and username
    const combinedString = user_id + username;

    // Function to shuffle a string
    function shuffleString(str) {
        const array = str.split('');
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array.join('');
    }

    // Create a jumbled string
    const contactID = shuffleString(combinedString);

    try {
        const user1 = await Contacts.findOne({ user_id: user_id });
        const user2 = await Contacts.findOne({ user_id: username });

        if (!user1 && !user2) {
            // Both users do not exist, create new contacts for both
            const newUser1 = new Contacts({
                user_id: user_id,
                contacts: [{ username, name, contactID }],
            });

            const newUser2 = new Contacts({
                user_id: username,
                contacts: [{ username: user_id, name: name2, contactID }],
            });

            await newUser1.save();
            await newUser2.save();
        } else {
            // At least one user exists
            if (!user1) {
                // user1 does not exist, create user1 and push contact
                const newUser1 = new Contacts({
                    user_id: user_id,
                    contacts: [{ username, name, contactID }],
                });
                await newUser1.save();
            } else {
                const user1_already_exists = user1.contacts.some(contact => contact.username === username);
                if (!user1_already_exists) {
                    user1.contacts.push({ username: username, name: name, contactID: contactID });
                    await user1.save();
                }
                else {
                    return res.json({ "status": "already-exists", "message": "contact Already Exists" });
                }
            }

            if (!user2) {
                // user2 does not exist, create user2 and push contact
                const newUser2 = new Contacts({
                    user_id: username,
                    contacts: [{ username: user_id, name: name2, contactID }],
                });
                await newUser2.save();
            } else {
                const user2_already_exists = user2.contacts.some(contact => contact.username === user_id);
                if (!user2_already_exists) {
                    user2.contacts.push({ username: user_id, name: name2, contactID: contactID });
                    await user2.save();
                } else {
                    return res.json({ "status": "already-exists", "message": "contact Already Exists" });
                }
            }

        }

    } catch (error) {
        console.error('Error adding contacts:', error);

        // Check if the error is a duplicate key error
        if (error.code === 11000) {
            return res.json({ error: 'Duplicate key violation. User or contact already exists.' });
        }

        return res.status(500).json({ error: 'Internal Server Error' });
    }

};


const deleteContact = async (req, res) => {
    const user_id = req.params.user;
    const { username } = req.body;

    try {
        // Remove contact from User1's contact list
        await Contacts.updateOne(
            { 'user_id': user_id },
            { $pull: { 'contacts': { username } } }
        );

        // Remove User1 from contact list of User2
        await Contacts.updateOne(
            { 'user_id': username },
            { $pull: { 'contacts': { username: user_id } } }
        );

        return res.status(200).json({ message: 'Contact deleted successfully' });
    } catch (error) {
        console.error('Error deleting contact:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = {
    getContacts,
    addContacts,
    deleteContact
};
