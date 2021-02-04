const mongoose = require('mongoose');

const mailLogSchema = new mongoose.Schema({
    batchId: {
        type: String
    },
    personName: {
        type: String
    },
    emailAddress: {
        type: String
    },
    fileName: {
        type: String
    },
    filePath: {
        type: String
    },
    emailBody: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model('mailLog', mailLogSchema);