const operations = require('../../../mongoose/controllers/UserOperations');
const jsonwebtoken = require('jsonwebtoken');
const validateSignInUser = require('../../../joi/validationSignIn');
const authenticateUser = require('../../middlewares/authenticateUser');

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
    // לבדוק האם היוזר מחובר ולתת סטטוסים לפי זה
    console.log(req.jsonwebtoken, '???');
    if (authenticateUser) {
        res.send({
            status: 'success',
            // user: // כאן לתת את האובייקט של היוזר המחובר
        });
    } else {
        res.send({
            status: 'error'
        })
    }

    // לשים לב להתייחס לנ"ל באנגולר
}
module.exports = { signInUser, signInStatus };