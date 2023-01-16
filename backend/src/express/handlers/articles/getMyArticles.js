const articleOperations = require('../../../mongoose/controllers/articleOperations');
// const signInUser = require('../users/signInUser')

async function getArticlesByUserId(req, res) {

    const userArticles = await articleOperations.getArticlesByUserId(req.userID);
    res.json(userArticles);
}

module.exports = getArticlesByUserId;