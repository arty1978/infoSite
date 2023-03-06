const operations = require('../../../mongoose/controllers/UserOperations');

/** @type {import("express").RequestHandler} */

async function updateUser(req, res) {

    const userId = req.body.id;
    if (!userId) {
        return res.status(400).json('user Id not deliverd');
    }
    req.body.updatedtedAt = new Date().toLocaleString();

    const result = await operations.updateUser(userId, req.body);
    if (result != null)
        return res.json(result);

    return res.status(500).json('error, user not updated');
}

module.exports = updateUser;
