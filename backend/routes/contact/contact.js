const express = require('express');
const router = express.Router();
const contactContoller = require('../../controllers/contacts/contact');

//routes
router.get("/get/:user", contactContoller.getContacts);
router.post("/add/:user", contactContoller.addContacts);
router.delete("/delete/:user", contactContoller.deleteContact);

module.exports = router;