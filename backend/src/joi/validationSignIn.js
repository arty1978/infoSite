const joi = require('joi');

const signInSchema = joi.object({
    email: joi.string().required().email(),
    password: joi.string().required()
})

function validateSignInUser(user) {
    return signInSchema.validate(user);
}
module.exports = validateSignInUser;

