const operations = require('../../../mongoose/controllers/UserOperations');


/** @type {import("express").RequestHandler} */
async function getOneUser(req, res) {
    // console.log(req.query._id, '!!!');
    // const userId = req.query._id;
    // if (!userId)
    //     return res.status(400).json('user Id not delivered');
    // console.log(userId, '???');

    // const user = await operations.getOneUser(userId, req.body);
    // console.log(user, '###');
    // res.json(user);
    const userId = req.query._id;
    if (!userId) {
        return res.status(400).json('user Id not deliverd');
    }
    const user = await operations.getOneUser(userId);
    if (user != null)
        return res.json(user);
    return res.status(500).json('error, no User found');
}



module.exports = getOneUser;