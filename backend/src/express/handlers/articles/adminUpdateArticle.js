const operations = require('../../../mongoose/controllers/articleOperations');


async function updateArticle(req, res) {
    const articleID = req.query._id;

    if (!articleID) {
        return res.status(400).json('Id not supported')
    }
    req.body.updatedtedAt = new Date().toLocaleString();
    const result = await operations.adminUpdateArticle(articleID, req.body);

    if (result !== null) {
        return res.json('article updated successfully')
    }
    return res.status(500).json('fail to update');
}


module.exports = updateArticle;