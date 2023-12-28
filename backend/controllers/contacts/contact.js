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
        // Check if User1 exists based on the provided user_id
        const userContacts1 = await Contacts.findOne({ user_id });

        if (!userContacts1) {
            // If User1 doesn't exist, create a new entry
            const newUserContacts1 = new Contacts({
                user_id,
                contacts: [{ username, name, contactID }]
            });
            await newUserContacts1.save();
        } else {
            // Check if the contact already exists for User1
            const isContactExists1 = userContacts1.contacts.some(contact => contact.username === username);

            if (!isContactExists1) {
                userContacts1.contacts.push({ username, name, contactID });
                await userContacts1.save();
            } else {
                return res.json({ status: "already-exists", error: 'Contact already exists for User1' });
            }
        }

        // Check if User2 exists based on the provided username
        const userContacts2 = await Contacts.findOne({ username });

        if (!userContacts2) {
            // If User2 doesn't exist, create a new entry
            const newUserContacts2 = new Contacts({
                user_id: username,
                contacts: [{ username: user_id, name: name2, contactID: contactID }]
            });
            await newUserContacts2.save();
        } else {
            // Check if the contact already exists for User2
            const isContactExists2 = userContacts2.contacts.some(contact => contact.username === user_id);

            if (!isContactExists2) {
                userContacts2.contacts.push({ username: user_id, name: name2, contactID: contactID });
                await userContacts2.save();
            } else {
                return res.json({ status: "already-exists", error: 'Contact already exists for User1' });
            }
        }

        return res.status(201).json({ message: 'Contacts added successfully' });
    } catch (error) {
        console.error('Error adding contacts:', error);

        // Check if the error is a duplicate key error
        if (error.code === 11000) {
            return res.status(400).json({ error: 'Duplicate key violation. User or contact already exists.' });
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
