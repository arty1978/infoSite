
const articleModel = require("../models/articleModel");

async function createArticleInMongoDb(articleDetails) {
    try {
        const dataArticleCreatedinDb = await new articleModel(articleDetails).save();
        return dataArticleCreatedinDb;
    } catch {
        return console.log('can not create article');
    }
}
async function getAllArticles() {
    try {
        const allArticles = await articleModel.find();
        return allArticles;
    } catch {
        return null;
    }
}

async function deleteArticle(articleId, userId) {

    try {
        const result = await articleModel.findByIdAndDelete({
            _id: articleId,
            userId: userId
        });
        return result;
    } catch {
        return null;
    }
}

async function updateArticle(cardId, userId, articleData) {
    try {
        console.log(cardId, userId, articleData);
        const updatedArticle = await articleModel.findByIdAndUpdate({ _id: cardId, userId: userId }, articleData);
        console.log(updatedArticle);
        return updatedArticle;
    }
    catch
    {
        return null;
    }
}

async function getOneArticle(id, articleData) {
    try {
        console.log(id, articleData, 'id+article');
        const article = await articleModel.findById(id, articleData);
        return article;
    }
    catch {
        return null;
    }
}
async function getOneByUserIDAndarticleID(userId, articleId) {
    console.log('getOneByUserIDAndarticleID', userId, articleId);
    try {
        const oneArticle = await articleModel.findOne({
            userId: userId,
            _id: articleId
        });
        return oneArticle;
    }
    catch {
        return null
    }
}

async function getArticlesByUserId(userId) {

    try {
        const userArticles = await articleModel.find({ userId: userId });
        return userArticles;
    } catch {
        return console.log('No Articles found for thit user');
    }
}



module.exports = {
    createArticleInMongoDb,
    getAllArticles,
    deleteArticle,
    updateArticle,
    getOneByUserIDAndarticleID,
    getArticlesByUserId,
    getOneArticle
}

