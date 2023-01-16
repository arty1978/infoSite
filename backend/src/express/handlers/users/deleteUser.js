const operations = require('../../../mongoose/controllers/UserOperations');

/** @type {import("express").RequestHandler} */
async function deleteOneUser(req, res) {
    const result = await operations.deleteUser(req.params.id);
    if (result === null) {
        return res.status(500).json('could not delete')
    }
    return res.json('Item Deleted from DB');
}

module.exports = deleteOneUser;
