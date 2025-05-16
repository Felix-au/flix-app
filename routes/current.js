const express = require('express');
const router = express.Router();
const Current = require('../models/Current');

router.get('/', async (req, res) => {
    try {
        const currentUser  = await Current.findOne();
        res.status(200).json(currentUser );
    } catch (error) {
        res.status(500).json({ message: "Error retrieving current user.", error });
    }
});

router.post('/', async (req, res) => {
    const { name } = req.body;
    try {
        const existingUser  = await Current.findOne();
        if (existingUser ) {
            return res.status(400).json({ message: "Current user already exists." });
        }
        const newCurrentUser  = new Current({ name });
        await newCurrentUser .save();
        res.status(201).json(newCurrentUser );
    } catch (error) {
        res.status(500).json({ message: "Error creating current user.", error });
    }
});

router.put('/', async (req, res) => {
    const { name } = req.body;
    try {
        const updatedUser  = await Current.findOneAndUpdate({}, { name }, { new: true });
        if (!updatedUser ) {
            const newCurrentUser  = new Current({ name });
            await newCurrentUser .save();
            return res.status(201).json(newCurrentUser );
        }
        res.status(200).json(updatedUser );
    } catch (error) {
        res.status(500).json({ message: "Error updating current user.", error });
    }
});

module.exports = router;