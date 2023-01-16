const userOperations = require('../../mongoose/controllers/UserOperations');
const jsonwebtoken = require('jsonwebtoken');

async function authenticateUser(req, response, next) {
    const { email, password } = req.headers;
    console.log({ email, password }, 'authen...');
    if (!req.headers.email || !req.headers.password)
        return res.status(401).json({ 'meg': "User not alowed,No email and password provided" });

    const userFromDb = await userOperations.signInUser(email, password);
    if (userFromDb === null)
        return res.status(401).json({ 'meg': "No email and password found in DB" });

    req.userID = userFromDb._id;

    next();

    //  .  נשלח טוקן .  
    // const token = req.headers.token;
    // if (!token)
    //     return response.status(401).json({ 'message': 'No token provided' });

    // try {
    //     const data = jsonwebtoken.verify(token, 'mykey');
    //     req.userID = data.userid;
    //     next();
    // }
    // catch
    // {
    //     return response.status(401).json({ 'message': 'Invalid token' });
    // }


}

module.exports = authenticateUser;