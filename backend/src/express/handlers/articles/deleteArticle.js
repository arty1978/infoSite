const operations = require('../../../mongoose/controllers/articleOperations');

/** @type {import("express").RequestHandler} */
async function deleteOneArticle(req, res) {

    const articleId = req.params.id;
    if (articleId) {
        const result = await operations.deleteArticle(articleId, req.userID);

        if (result !== null)
            return res.json('Item Deleted from DB');
    }
    return res.status(500).json('could not delete')
}

module.exports = deleteOneArticle;