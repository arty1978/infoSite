
const userModel = require("../models/userModel");
const bcryptjs = require('bcryptjs');


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
        console.log(userFromDb, '???');
        if (!userFromDb)
            return null;
        if (userFromDb.tempPassword == password) {
            userFromDb.tempReset = true
            return userFromDb;
        }

        const result = await bcryptjs.compare(password, userFromDb.password);
        if (result)
            console.log('status', 200);
        // return userFromDb;
        return result;

    } catch {
        return console.log('error occurred');
    }
}
async function resetPassword(email) {

    try {
        userFromDb = await userModel.findOne(email);
        if (!userFromDb)
            return null;

        return userFromDb;
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
    console.log(id, userData, 'in operations');
    try {
        console.log({ _id: id }, userData, 'before bcrypts');
        userData.password = bcryptjs.hashSync(userData.password);
        // console.log(userData.password); checked
        userData.passwordConfirmation = bcryptjs.hashSync(userData.passwordConfirmation);
        // console.log(userData.passwordConfirmation); checked 
        // console.log({ id: id }, userData, 'after password');
        const updatedUser = await userModel.findByIdAndUpdate({ _id: id }, userData);
        console.log(updatedUser, userData.passwordConfirmation, 'updated user in operations');
        return updatedUser;
    }
    catch
    {
        return null;
    }
}

async function updateUserPass(id, userData) {
    try {
        const updatedUser = await userModel.findByIdAndUpdate({ _id: id }, userData);
        return updatedUser;
    }
    catch
    {
        return null;
    }
}

async function getOneUser(id, userData) {
    try {
        const user = await userModel.findById(id, userData);
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
    getOneUser,
    resetPassword, updateUserPass
}

