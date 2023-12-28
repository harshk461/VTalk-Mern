const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const ContactsSchema = new Schema({
    user_id: {
        type: String,
        required: true,
        unique: true
    },
    contacts: [
        {
            username: {
                type: String,
                requried: true,
            },
            name: {
                type: String,
                requried: true,
            },
            contactID: {
                type: String,
                requried: true,
            }

        }
    ]
});

// Add compound index on user_id and contacts.username
ContactsSchema.index({ user_id: 1, 'contacts.username': 1 }, { unique: true });

const Contacts = mongoose.model("user_contacts", ContactsSchema);

module.exports = Contacts;
