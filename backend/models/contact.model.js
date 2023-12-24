// const mongoose = require('mongoose');

// const contactSchema = new mongoose.Schema({
//     user_id: {
//         type: String,
//         required: true
//     },
//     contacts: [
//         {
//             username: {
//                 type: String,
//             },
//         }
//     ]
// });

// const UserContacts = mongoose.model('user_contacts', contactSchema);

// module.exports = UserContacts;

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
                unique: true
            }
        }
    ]
});

// Add compound index on user_id and contacts.username
ContactsSchema.index({ user_id: 1, 'contacts.username': 1 }, { unique: true });

// Create model
const Contacts = mongoose.model("user_contacts", ContactsSchema);

module.exports = Contacts;
