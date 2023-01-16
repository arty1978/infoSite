const operations = require('../../../mongoose/controllers/articleOperations');
const validateNewArticle = require('../../../joi/validateArticle')


//Meta data for visual studio code
/** @type {import("express").RequestHandler} */
async function createArticle(req, res) {

    const result = validateNewArticle(req.body);

    if (result.err) return response.status(400).json(result.error.details[0].message);
    req.body.userId = req.userID;

    const articleFromDb = await operations.createArticleInMongoDb(req.body)
    if (articleFromDb === null) {
        return res.status(500).json("General error. article not saved")
    }
    res.json(articleFromDb)
}

module.exports = createArticle;