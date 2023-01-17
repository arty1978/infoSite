const joi = require('joi');

const articleSchema = joi.object({
    title: joi.string().required(),
    subTitle: joi.string().required(),
    category: joi.string().required(),
    body: joi.string().required(),
    author: joi.string().required(),
    createdAt: joi.string().required()
});

function validateNewArticle(article) {
    return articleSchema.validate(article);
}
module.exports = validateNewArticle;
