const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const slug = require('mongoose-slug-generator');

mongoose.plugin(slug);

const User = new Schema({
    username: {type: String, unique: true, required: true},
    password: {type: String, required: true},
    fullName: {type: String, trim: true, required: true},
    email: {type: String},
    phone: {type: String},
    address: {type: String},
    avatar: {type: String},
    token: {type: Number},
    isShop: {type: Boolean, default: false},
    isAdmin: {type: Boolean, default: false},
    isActive: {type: Boolean, default: false},
    slug: {type: String, slug: 'username', unique: true},
}, {timestamps: true})


User.statics.createUser = async function (user) {
    if (!user.username) throw ({error: 'Username of user is not empty'});
    if (!user.password) throw ({error: 'Password of user is not empty'});
    if (!user.email) throw ({error: 'Email of user is not empty'});
    const isExist = await this.findOne({username: user.username});
    if (isExist) throw ({error: 'User is exist in database'});
    return await this.create({...user});
}

User.statics.updateUser = async function (firstName, lastName, email, password) {
    if (!firstName) throw ({error: 'FirstName of user is not empty'});
    if (!lastName) throw ({error: 'LastName of user is not empty'});
    if (!password) throw ({error: 'Password of user is not empty'});
    if (!email) throw ({error: 'Email of user is not empty'});
    return await this.update({firstName, lastName, email, password});
}

User.statics.findUserByEmail = async function (value) {
    const user = await this.findOne({email: value});
    if (!user) throw ({error: 'User is exist in database'});
    return user;
}


module.exports = mongoose.model('User', User);
