const jsonwebtoken = require('jsonwebtoken');

async function authenticateUser(req, res, next) {
    const token = req.headers.token;
    console.log(req.headers.token, 'headers777777');
    if (!token)
        return res.status(401).json({ 'message': 'No token provided' });
    try {
        const userFromDb = jsonwebtoken.verify(token, 'webToken');
        // const userFromDb = jsonwebtoken.sign({ userid: userFromDb._id }, 'webToken');
        console.log(userFromDb, '????');
        req.userID = userFromDb.userid;
        req.author = userFromDb.fullName;
        next();
    } catch {
        return res.status(401).json({ 'message': 'Invalid token' });
    }

}

module.exports = authenticateUser;


