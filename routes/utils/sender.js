const nodemailer = require("nodemailer");

async function sendMail(mailDetails) {
    let transporter = nodemailer.createTransport({
        host: "smtp.mailgun.org",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: process.env.mailUsername, // generated ethereal user
            pass: process.env.mailPassword, // generated ethereal password
        },
    });
    // send mail with defined transport object
    let info = await transporter.sendMail({
        from: mailDetails.mailFrom, // sender address
        to: mailDetails.mailTo, // list of receivers
        subject: mailDetails.subject, // Subject line
        html: mailDetails.mailBody, // html body,
        attachments: [{
            filename: 'test.docx',
            path: 'uploads/SAFEEEQ FLOW CHART.docx'
        }]
    });
    return info;
}

module.exports = {
    sendMail
}