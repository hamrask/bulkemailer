const mongoose = require('mongoose');

const documentSchema = new mongoose.Schema({
    projectId: {
        type: String,
        required: true,
        min: 3
    },
    fileName: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    docUrl: {
        type: String,
        required: true
    },
    active: {
        type: Boolean,
        default: true
    }
});

module.exports = mongoose.model('document', documentSchema);