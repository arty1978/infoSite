
const adminModel = require("../models/adminModel");
const bcryptjs = require('bcryptjs');


async function createAdminInMongoDb(userDetails) {
    try {
        userDetails.password = bcryptjs.hashSync(userDetails.password);
        userDetails.passwordConfirmation = bcryptjs.hashSync(userDetails.passwordConfirmation);
        const dataAdminCreatedinDb = await new adminModel(userDetails).save();
        return dataAdminCreatedinDb;
    } catch (e) {
        return console.log(e, 'can not create user');
    }
}
async function signInAdmin(email, password) {
    try {
        console.log({ email: email }, '!!!');
        adminFromDb = await adminModel.findOne({ email: email });
        if (!adminFromDb)
            return null;
        const result = Promise.resolve(bcryptjs.compare(password, adminFromDb.password));

        if (result)
            // console.log(result);
            return adminFromDb;
        // return null
    } catch {
        return console.log('error occurred');
    }
}

async function deleteAdmin(id) {
    try {

        const delAdmin = await adminModel.deleteOne({
            _id: id
        });
        return delAdmin;
    } catch {
        return null;
    }
}

async function updateAdmin(id, userData) {
    try {

        const updatedAdmin = await adminModel.findOneAndUpdate({ _id: id }, userData);
        return updatedAdmin;
    }
    catch
    {
        return null;
    }
}


module.exports = {
    createAdminInMongoDb,
    signInAdmin,
    deleteAdmin,
    updateAdmin,
}

