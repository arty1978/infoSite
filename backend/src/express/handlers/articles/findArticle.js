const operations = require('../../../mongoose/controllers/articleOperations');



/** @type {import("express").RequestHandler} */
async function getOneArticle(req, res) {
    const articleId = req.params.id;
    if (!articleId) {
        return res.status(400).json('article Id not deliverd');
    }
}



module.exports = getOneArticle;