const operations = require('../../../mongoose/controllers/UserOperations');
const validateNewUser = require('../../../joi/validateRegister')


//Meta data for visual studio code
/** @type {import("express").RequestHandler} */
async function createUser(req, res) {

    const { error } = validateNewUser(req.body);

    if (error)
        return res.status(400).json(error.details[0].message);

    req.body.createdAt = new Date().toLocaleString();

    // const msg1 = `
    // Welcome to the World Wide Article Archive.
    // Your userName is ${item.fullName},
    // If you forgot your password, 
    // please go to "Reset your password" link on the "Login" page
    // `;

    // await this.mailService.mailer(body.email, msg)
    // const resetCode = `Rc${Math.round(Math.random() * 100000000)}`
    // const msg2 = `Your Reset Code Is ${resetCode}`;
    // const msg3 = `
    //    שלום ${item.fullName}
    //    .הפרטים האישים שלך עודכנו בהצלחה 
    //    המשך גלישה מהנה.
    //     `;


    const userFromDb = await operations.createAUserInMongoDb(req.body)
    if (!userFromDb) {

        return res.status(500).json("General error. user not saved")
    }
    res.json(userFromDb)
}

module.exports = createUser;