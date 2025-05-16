// routes/content.js

const express = require('express');
const Content = require('../models/Content');
const router = express.Router();

router.post('/', async (req, res) => {
    const newContent = new Content(req.body);
    try {
        const savedContent = await newContent.save();
        res.status(201).json(savedContent);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.get('/', async (req, res) => {
    try {
        const content = await Content.find();
        res.json(content);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;