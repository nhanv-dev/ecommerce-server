const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const slug = require('mongoose-slug-generator');

mongoose.plugin(slug);

const UserAddress = new Schema({
    userId: {type: String, required: true},
    address: {type: String},
    phone: {type: String},
}, {timestamps: true})


module.exports = mongoose.model('UserAddress', UserAddress);
