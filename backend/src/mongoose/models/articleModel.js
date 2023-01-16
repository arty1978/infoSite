
const mongoose = require('mongoose');

const articleSchema = mongoose.Schema({
    title: String,
    subTitle: String,
    category: String,
    body: String,
    author: String,
    userId: String
});


const articleModel = mongoose.model('article', articleSchema);

module.exports = articleModel;
