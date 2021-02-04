const mailLogger = require('../../models/mailLog');


saveMailLog = async(mailDetails) => {
    try {
        const data = new mailLogger(mailDetails);
        const response = await data.save();
        return response;
    } catch (error) {
        return error;
    }
}

module.exports = {
    saveMailLog
}