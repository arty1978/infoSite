const nodemailer = require('nodemailer');
const sender = 'artyf@walla.co.il'

function mailer(receipient, msg) {


    const transporter = nodemailer.createTransport({
        service: 'walla',
        auth: {
            user: sender,
            pass: 'Jopa1928'
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