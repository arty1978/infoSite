const nodemailer = require('nodemailer');
const sender = 'artyomfrid@outlook.com'

function mailer(receipient, msg) {


    const transporter = nodemailer.createTransport({
        service: 'outlook',
        auth: {
            user: sender,
            pass: 'Open2023'
        }
    });

    const mailOptions = {
        from: sender,
        to: receipient,
        subject: 'Sending Email using Node.js',
        text: msg
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}
module.exports = mailer;