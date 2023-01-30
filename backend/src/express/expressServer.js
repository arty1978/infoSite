const express = require('express');
const cors = require('cors');
const server = express();


const createArticle = require('./handlers/articles/createArticle');
const getArticles = require('./handlers/articles/getArticles');
const getArticlesByUserId = require('./handlers/articles/getMyArticles');
const deleteArticle = require('./handlers/articles/deleteArticle');
const updateArticle = require('./handlers/articles/updateArticle');
const getOneByUserIDAndarticleID = require('./handlers/articles/getArticleByUserIdAndArticleId');
const getOneArticle = require('./handlers/articles/findArticle')

const signUpUser = require('./handlers/users/registerUser')
const signinUser = require('./handlers/users/signInUser').signInUser;
const getUsers = require('./handlers/users/getUsers');
const deleteUser = require('./handlers/users/deleteUser');
const updateUser = require('./handlers/users/updateUser');
const getOneUser = require('./handlers/users/findUser');
const authenticateUser = require('./middlewares/authenticateUser');//1
const signInStatus = require('./handlers/users/signInUser').signInStatus;
const resetPassword = require('./handlers/users/reset');
const signInAdmin = require('./handlers/admin/signInAdmin');
const registerAdmin = require('./handlers/admin/registerAdmin')

server.use(express.json());
server.use(cors({
    origin: true,
    // origin: 'http://localhost:4200',
    methods: 'GET,PUT,POST,DELETE,OPTIONS',
    credentials: true,
    allowedHeaders: 'Content-Type, Accept, token',
}));

server.options('*', (req, res, next) => {
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Accept, token');
    res.setHeader('Access-Control-Max-Age', '3600');
    res.status(204).send();
    next();
});

server.post('/articles/create', authenticateUser, createArticle);//3
server.get('/articles', getArticles);
server.delete('/articles/deleteone/:id', authenticateUser, deleteArticle);
server.put('/articles/updateone', authenticateUser, updateArticle)
server.get('/articles/findOneArticle', authenticateUser, getOneByUserIDAndarticleID);
server.get('/articles/getMyArticles', authenticateUser, getArticlesByUserId);
server.get('/articles/findarticle', getOneArticle);

server.get('/users', getUsers);
server.post('/users/create', signUpUser);
server.post('/users/signin', signinUser);
server.get('/users/signin', signInStatus);
server.delete('/users/deleteone/:id', authenticateUser, deleteUser);
server.get('/users/finduser', authenticateUser, getOneUser);//2
server.put('/users/updateone', authenticateUser, updateUser)
server.post('/users/reset', resetPassword)

server.post('/admin/signin', signInAdmin);
server.post('/admin/create', registerAdmin);


server.listen(3900, () => console.log('connected to express server on port 3900'));
