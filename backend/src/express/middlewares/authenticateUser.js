const userOperations = require('../../mongoose/controllers/UserOperations');
const jsonwebtoken = require('jsonwebtoken');

async function authenticateUser(req, response, next) {
    const token = req.headers.token;
    if (!token)
        return res.status(401).json({ 'message': 'No token provided' });
    try {
        const userFromDb = jsonwebtoken.verify(token, 'webToken')
        req.userID = userFromDb._id;
        next();
    } catch {
        return response.status(401).json({ 'message': 'Invalid token' });
    }



    //  .  נשלח טוקן .  
    // const token = req.headers.token;
    // if (!token)
    //     return response.status(401).json({ 'message': 'No token provided' });

    // try {
    //     const data = jsonwebtoken.verify(token, 'webToken');
    //     req.userID = data.userid;
    //     next();
    // }
    // catch
    // {
    //     return response.status(401).json({ 'message': 'Invalid token' });
    // }


}

module.exports = authenticateUser;