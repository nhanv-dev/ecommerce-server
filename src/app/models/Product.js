const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const slug = require('mongoose-slug-generator');
const {mongooseToObject} = require("../../utils/mongoose");

mongoose.plugin(slug);

const Product = new Schema({
    name: {type: String, required: true, trim: true},
    slug: {type: String, unique: true, slug: 'name'},
    description: {type: String, trim: true},
    basePrice: {type: Number, required: true},
    discountPercent: {type: Number, required: true},
    images: [{url: {type: String}}],
    totalStock: {type: Number, default: 0},
    tags: [{type: String}],
    sold: {type: Number, default: 0},
    assess: {type: Number, default: 0},
    rating: {type: Number, default: 0},
    categoryId: {type: Schema.Types.ObjectId, required: true},
    shopId: {type: Schema.Types.ObjectId, required: true},
}, {timestamps: true})

Product.statics.saveProduct = async function (product) {
    return await this.create({...product});
}

Product.statics.findByProductId = async function (_id) {
    return await this.findOne({_id});
}

Product.statics.findBySlug = async function (slug) {
    return await this.findOne({slug});
}

Product.statics.findAll = async function (category) {
    // return products[0];
    return null;
}
Product.statics.findByShop = async function (shop) {
    return await this.find({shopId: shop._id});
}

module.exports = mongoose.model('Product', Product);
