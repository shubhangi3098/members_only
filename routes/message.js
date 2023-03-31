const express = require('express');
const router = express.Router();

const messageController = require('../controllers/messageController');

// GET request to create new message
router.get('/create', messageController.create_message_get);

// POST request to create new message
router.post('/create', messageController.create_message_post);

// GET request to delete message
router.get('/:id/delete', messageController.delete_message_get);

module.exports = router;
