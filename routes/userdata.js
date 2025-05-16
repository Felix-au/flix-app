const express = require('express');
const router = express.Router();
const UserData = require('../models/Userdata');

router.post('/signup', async (req, res) => {
    const { fullName, email, password } = req.body;

    try {
        const existingUser  = await UserData.findOne({ $or: [{ email }, { fullName }] });

        if (existingUser ) {
            return res.status(400).json({ message: "Email or Username already in use." });
        }

        const newUser  = new UserData({ fullName, email, password });
        await newUser .save();
        res.status(201).json({ message: "Sign Up successful! Your data has been saved. You will be redirected to login page in 3 seconds." });
    } catch (error) {
        res.status(500).json({ message: "Error saving user data.", error });
    }
});

router.get('/users', async (req, res) => {
    try {
        const users = await UserData.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: "Error retrieving users data.", error });
    }
});

router.put('/users/:id', async (req, res) => {
    const { id } = req.params;
    const { password } = req.body;

    try {
        const updatedUser  = await UserData.findByIdAndUpdate(id, { password }, { new: true });
        
        if (!updatedUser ) {
            return res.status(404).json({ message: "User  not found." });
        }

        res.status(200).json({ message: "Password updated successfully.", user: updatedUser  });
    } catch (error) {
        res.status(500).json({ message: "Error updating password.", error });
    }
});

module.exports = router;