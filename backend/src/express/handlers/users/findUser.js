const operations = require('../../../mongoose/controllers/UserOperations');


/** @type {import("express").RequestHandler} */
async function getOneUser(req, res) {

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