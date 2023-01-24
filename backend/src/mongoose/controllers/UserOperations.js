
const userModel = require("../models/userModel");
const bcryptjs = require('bcryptjs');

// const operations= require('./')

async function createAUserInMongoDb(userDetails) {
    try {
        userDetails.password = bcryptjs.hashSync(userDetails.password);
        userDetails.passwordConfirmation = bcryptjs.hashSync(userDetails.passwordConfirmation);
        const dataUserCreatedinDb = await new userModel(userDetails).save();
        return dataUserCreatedinDb;
    } catch (e) {
        return console.log(e, 'can not create user');
    }
}
async function signInUser(email, password) {
    try {
        userFromDb = await userModel.findOne({ email: email });
        console.log(userFromDb, '!!!');
        if (!userFromDb)
            return null;
        // const result = await bcryptjs.compare(password, userFromDb.password);
        const result = Promise.resolve(bcryptjs.compare(password, userFromDb.password));

        if (result)
            // console.log(result);
            return userFromDb;
        // return null
    } catch {
        return console.log('error occurred');
    }
}
async function getAllUsers() {
    try {
        const allUsers = await userModel.find();
        return allUsers;
    } catch {
        return null;
    }
}

async function deleteUser(id) {
    try {

        const delUser = await userModel.deleteOne({
            _id: id
        });
        return delUser;
    } catch {
        return null;
    }
}

async function updateUser(id, userData) {
    try {

        const updatedUser = await userModel.findOneAndUpdate({ _id: id }, userData);
        return updatedUser;
    }
    catch
    {
        return null;
    }
}

async function getOneUser(id) {
    try {
        const user = await userModel.findById(id);
        return user;
    }
    catch {
        return null;
    }
}

module.exports = {
    createAUserInMongoDb,
    signInUser,
    getAllUsers,
    deleteUser,
    updateUser,
    getOneUser
}

