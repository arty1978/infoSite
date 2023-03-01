const operations = require('../../../mongoose/controllers/UserOperations');
// const nodemailer = require('nodemailer');
const mailer = require('../../../../mailer')
async function resetPassword(req, res) {
    const email = req.body;
    // console.log(email, '!!!');
    const userFromDb = await operations.resetPassword(email);
    // console.log(userFromDb.email, 'userFromDb.email');
    if (!userFromDb)
        return res.status(500).json('no user found');
    userFromDb.tempPassword = `Np@${Math.round(Math.random() * 100000000)}`;
    // console.log(userFromDb.tempPassword, 'temppass');
    const msg = `Your Reset Code is ${userFromDb.tempPassword}`;
    mailer(userFromDb.email, msg);
    userFromDb.tempReset = true;
    // console.log(userFromDb);
    const result = await operations.updateUserPass(userFromDb._id, userFromDb);

    return res.json(result);
}


module.exports = resetPassword;

