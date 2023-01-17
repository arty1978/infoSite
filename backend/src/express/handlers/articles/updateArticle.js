const operations = require('../../../mongoose/controllers/articleOperations');


async function updateArticle(req, res) {
    const articleID = req.query._id;
    const userID = req.articleID
    console.log(req.body);

    if (!articleID) {
        return res.status(400).json('Id not supported')
    }
    req.body.updatedtedAt = new Date().toLocaleString();
    console.log(req.body.updatedtedAt)
    const result = await operations.updateArticle(articleID, userID, req.body);
    if (result !== null) {
        return res.json('article updated successfully')
    }
    return res.status(500).json('fail to update');
}


module.exports = updateArticle;