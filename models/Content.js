
const mongoose = require('mongoose');

const contentSchema = new mongoose.Schema({
    mainContent: {
        welcome: {
            title: { type: String, required: true },
            subtitle: { type: String, required: true },
            style: {
                color: { type: String, required: true },
                hoverColor: { type: String, required: true }
            }
        },
        about: {
            title: { type: String, required: true },
            description: { type: String, required: true },
            style: {
                color: { type: String, required: true },
                hoverColor: { type: String, required: true }
            }
        }
    }
});

const Content = mongoose.model('Content', contentSchema);

module.exports = Content;