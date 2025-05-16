const mongoose = require('mongoose');

const currentUserSchema = new mongoose.Schema({
    name: { type: String, required: true }
});

module.exports = mongoose.model('Current', currentUserSchema);