const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const slug = require('mongoose-slug-generator');

mongoose.plugin(slug);

const Shop = new Schema({
    name: {type: String, trim: true, required: true},
    slug: {type: String, unique: true, slug: 'name'},
    slogan: {type: String, trim: true},
    description: {type: String, trim: true},
    area: {type: String, trim: true},
    address: {type: String, trim: true, required: true},
    phone: {type: String, trim: true, required: true},
    email: {type: String, trim: true, required: true},
    avatar: {type: String, trim: true},
    background: {type: String, trim: true},
    tags: [{
        tagName: {type: String, trim: true},
        slug: {type: String, slug: 'tagName'}
    }],
    amountProducts: {type: Number, default: 0},
    rating: {type: Number, default: 0},
    numberOfRating: {type: Number, default: 0},
    followed: {type: Number, default: 0},
    following: {type: Number, default: 0},
    responseRate: {type: Number, default: 0},
    responseTime: {type: String, default: 'Đang cập nhật'},
    accountId: {type: Schema.Types.ObjectId, required: true},
}, {timestamps: true});

Shop.statics.saveShop = async function (shop) {
    return this.create({...shop})
}
Shop.statics.findAll = async function (options) {
    // return this.find({})
}

Shop.statics.findByAccountId = async function (accountId) {
    return this.findOne({accountId: accountId})
}

Shop.statics.findBySlug = async function (slug) {
    return this.findOne({slug})
}

module.exports = mongoose.model('Shop', Shop);
