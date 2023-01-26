// const jsonwebtoken = require('jsonwebtoken');

// async function authenticateUser(req, res, next) {
//     const token = req.headers.token;
//     if (!token)
//         return res.status(401).json({ 'message': 'No token provided' });
//     try {
//         const userFromDb = jsonwebtoken.verify(token, 'webToken')
//         req.userID = userFromDb.userid;
//         req.author = userFromDb.fullName;
//         next();
//     } catch {
//         return res.status(401).json({ 'message': 'Invalid token' });
//     }

// }

// module.exports = authenticateUser;


