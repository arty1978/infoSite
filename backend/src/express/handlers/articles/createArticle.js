const operations = require('../../../mongoose/controllers/articleOperations');
const validateNewArticle = require('../../../joi/validateArticle')
// const moment = require('moment');

//Meta data for visual studio code
/** @type {import("express").RequestHandler} */
async function createArticle(req, res) {

    const result = validateNewArticle(req.body);
    console.log(req.userID);

    if (result.err) return response.status(400).json(result.error.details[0].message);
    req.body.userId = req.userID;
    req.body.createdAt = new Date().toLocaleString;
    console.log(req.body);
    const articleFromDb = await operations.createArticleInMongoDb(req.body)
    if (articleFromDb === null) {
        return res.status(500).json("General error. article not saved")
    }
    res.json(articleFromDb)
}

module.exports = createArticle;