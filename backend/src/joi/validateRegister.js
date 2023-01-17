const joi = require('joi');

const schema = joi.object({
    userName: joi.string().required(),
    fullName: joi.string().required(),
    email: joi.string().required().email(),
    password: joi.string().required(),
    passwordConfirmation: joi.string().required()
});

function validateNewUser(user) {
    return schema.validate(user);
}

module.exports = validateNewUser;