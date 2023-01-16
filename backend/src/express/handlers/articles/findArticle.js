const operations = require('../../../mongoose/controllers/articleOperations');



/** @type {import("express").RequestHandler} */
async function getOneArticle(req, res) {
    const articleId = req.params.id;
    if (!articleId) {
        return res.status(400).json('article Id not deliverd');
    }
    // const article = await operations.getOneArticle(articleId);
    // if (article != null)
    //     return res.json(article);
    // return res.status(500).json('error, no Article found');
}



module.exports = getOneArticle;