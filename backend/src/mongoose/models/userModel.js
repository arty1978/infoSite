
const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');


const userSchema = mongoose.Schema({
    userName: String,
    fullName: String,
    email: { type: String, unique: true },
    password: String,
    passwordConfirmation: String,
    createdAt: String,
    updatedtedAt: String
});
userSchema.plugin(uniqueValidator);
userSchema.pre('save', (next) => {
    const user = this;
    if (user.password !== user.passwordConfirmation) {
        return next(new Error('Passwords do not match'));
    }
    return next();
});

const userModel = mongoose.model('User', userSchema);

module.exports = userModel;