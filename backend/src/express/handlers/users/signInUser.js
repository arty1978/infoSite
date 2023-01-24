const operations = require('../../../mongoose/controllers/UserOperations');
const jsonwebtoken = require('jsonwebtoken');
const validateSignInUser = require('../../../joi/validationSignIn');

async function signInUser(req, res) {
    const { error } = validateSignInUser(req.body);
    if (error)
        return res.status(401).json(error.details[0].message);
    const { email, password } = req.body;
    const userFromDb = await operations.signInUser(email, password);
    if (!userFromDb)
        return res.status(500).json('no user found');
    const token = jsonwebtoken.sign({ userid: userFromDb._id }, 'webToken');
    console.log(token, 'this is token');
    return res.json({
        token,
        user: userFromDb
    });
}
function signInStatus(req, res) {
    if (req.body.user) {
        res.send({
            status: 'success',
            user: req.body.user
        });
    } else {
        res.send({
            status: 'error'
        })
    }
}
module.exports = signInUser, signInStatus;