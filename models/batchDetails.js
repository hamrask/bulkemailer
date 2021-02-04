const mongoose = require('mongoose');

const batchDetailSchema = new mongoose.Schema({
    from: {
        type: String
    },
    mailTemplate: {
        type: String
    },
    completed: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model('batch', batchDetailSchema);