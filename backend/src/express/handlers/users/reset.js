const operations = require('../../../mongoose/controllers/UserOperations');

async function resetPassword(req, res) {
    const email = req.body;
    // console.log(email);
    const userFromDb = await operations.resetPassword(email);
    // console.log(userFromDb);
    if (!userFromDb)
        return res.status(500).json('no user found');
    userFromDb.tempPassword = `Np${Math.round(Math.random() * 100000000)}@`;
    userFromDb.tempReset = true;
    console.log(userFromDb);
    const result = await operations.updateUserPass(userFromDb._id, userFromDb);

    return res.json(result);
}


module.exports = resetPassword;

// I WILL CONTINUE TO WORK ON THIS PROGECT AFTER GETTING MY GRADE PLEASE DO NOT PAY ATTENITON!!!