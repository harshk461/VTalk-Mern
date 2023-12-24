const Contacts = require('../../models/contact.model');

const getContacts = async (req, res) => {
    const username = req.params.user;
    console.log(username);
    try {
        const userContacts = await Contacts.findOne({ 'user_id': username });
        console.log(userContacts);
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
    const { username } = req.body;

    try {
        // Find User1 based on the provided user_id
        const userContacts1 = await Contacts.findOne({ 'user_id': user_id });

        if (!userContacts1) {
            // If User1 doesn't exist, create a new entry
            const newUserContacts1 = new Contacts({
                user_id: user_id,
                contacts: [{ username }]
            });
            await newUserContacts1.save();
        } else {
            // Check if the contact already exists for User1
            const isContactExists1 = userContacts1.contacts.some(contact => contact.username === username);

            if (!isContactExists1) {
                userContacts1.contacts.push({ username });
                await userContacts1.save();
            } else {
                return res.status(400).json({ error: 'Contact already exists for User1' });
            }
        }

        // Find User2 based on the provided username
        const userContacts2 = await Contacts.findOne({ 'user_id': username });

        if (!userContacts2) {
            // If User2 doesn't exist, create a new entry
            const newUserContacts2 = new Contacts({
                user_id: username,
                contacts: [{ username: user_id }]
            });
            await newUserContacts2.save();
        } else {
            // Check if the contact already exists for User2
            const isContactExists2 = userContacts2.contacts.some(contact => contact.username === user_id);

            if (!isContactExists2) {
                userContacts2.contacts.push({ username: user_id });
                await userContacts2.save();
            } else {
                return res.status(400).json({ error: 'Contact already exists for User2' });
            }
        }

        return res.status(201).json({ message: 'Contacts added successfully' });
    } catch (error) {
        console.error('Error adding contacts:', error);
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
