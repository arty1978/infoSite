const operations = require('../../../mongoose/controllers/articleOperations');


/** @type {import("express").RequestHandler} */
async function getAllArticles(request, response) {
    const articles = await operations.getAllArticles();
    response.json(articles)
}
module.exports = getAllArticles;