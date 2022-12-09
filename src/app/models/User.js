const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const slug = require('mongoose-slug-generator');
const {multipleMongooseToObject, mongooseToObject} = require('../../utils/mongoose')

mongoose.plugin(slug);

const USER_TYPES = {
    CONSUMER: "consumer",
    SUPPORT: "support",
};

const User = new Schema({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    username: {type: String, unique: true, required: true},
    password: {type: String, required: true},
    email: {type: String, required: true},
    type: String,
    token: {type: String, default: ''},
    isActive: {type: Boolean, default: false},
    slug: {type: String, slug: 'username', unique: true},
}, {timestamps: true})

<<<<<<< Updated upstream
User.statics.getAll = async function () {
    return await this.find();
}

=======
>>>>>>> Stashed changes
User.statics.createUser = async function (firstName, lastName, username, password, email, type) {
    if (!firstName) throw ({error: 'FirstName of user is not empty'});
    if (!lastName) throw ({error: 'LastName of user is not empty'});
    if (!username) throw ({error: 'Username of user is not empty'});
    if (!password) throw ({error: 'Password of user is not empty'});
    if (!email) throw ({error: 'Email of user is not empty'});
    const isExist = await this.findOne({username});
    if (isExist) throw ({error: 'User is exist in database'});
    return await this.create({firstName, lastName, username, password, email, type});
}
User.statics.updateUser = async function (firstName, lastName, email, password) {
    if (!firstName) throw ({error: 'FirstName of user is not empty'});
    if (!lastName) throw ({error: 'LastName of user is not empty'});
    if (!password) throw ({error: 'Password of user is not empty'});
    if (!email) throw ({error: 'Email of user is not empty'});
    return await this.update({firstName, lastName, email, password});
}
<<<<<<< Updated upstream
=======

User.statics.findUserByEmail = async function (value) {
    const user = await this.findOne({email: value});
    if (!user) throw ({error: 'User is exist in database'});
    return await mongooseToObject(user);
}
>>>>>>> Stashed changes

module.exports = mongoose.model('User', User);
