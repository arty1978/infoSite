const operations = require('../../../mongoose/controllers/articleOperations');



/** @type {import("express").RequestHandler} */
async function getOneArticle(req, res) {
    const articleId = req.params.id;
    console.log(articleId);
    if (!articleId) {
        return res.status(400).json('article Id not deliverd');
    }
    const article = await operations.getOneArticle(req.articleId, req.body);
    console.log(req.articleId, req.body);
    res.json(article)
}



module.exports = getOneArticle;