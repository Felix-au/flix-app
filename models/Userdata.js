const mongoose = require('mongoose');

const UserDataSchema = new mongoose.Schema({
    fullName: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

const UserData = mongoose.model('User Data', UserDataSchema);

module.exports = UserData;