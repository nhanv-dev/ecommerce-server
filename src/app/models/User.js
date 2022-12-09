const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const slug = require('mongoose-slug-generator');

mongoose.plugin(slug);

const User = new Schema({
    username: {type: String, unique: true},
    password: {type: String},
    fullName: {type: String, trim: true},
    email: {type: String},
    type: String,
    slug: {type: String, slug: 'username', unique: true},
}, {timestamps: true})


module.exports = mongoose.model('User', User);
