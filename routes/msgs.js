const express = require('express');
const router = express.Router();
const Message = require('../models/Msgs');

router.post('/', async (req, res) => {
    const { name, email, message } = req.body;

    try {
        const newMessage = new Message({ name, email, message });
        await newMessage.save();
        res.status(201).json({ message: 'Message sent successfully!' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error saving message.' });
    }
});

router.get('/', async (req, res) => {
    try {
        const messages = await Message.find(); 
        res.status(200).json(messages);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error retrieving messages.' });
    }
});

module.exports = router;