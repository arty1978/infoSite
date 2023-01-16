const operations = require('../../../mongoose/controllers/UserOperations');


/** @type {import("express").RequestHandler} */
async function getAllUsers(request, response) {
    const users = await operations.getAllUsers();
    response.json(users)
}
module.exports = getAllUsers;