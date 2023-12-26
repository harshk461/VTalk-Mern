const router = require('express').Router();
const chatController = require('../../controllers/chat/chat');

//Routes
router.post("/new-message", chatController.SendMessage);

module.exports = router;
