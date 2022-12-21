const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const slug = require('mongoose-slug-generator');
const ProductOption = require('../models/ProductOption');
const ProductOptionValue = require('../models/ProductOptionValue');
const ProductCombination = require('../models/ProductCombination');
const {mongooseToObject, multipleMongooseToObject} = require("../../utils/mongoose");

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
Product.statics.findDetail = async function (product) {
    const payload = {}
    const combinations = await multipleMongooseToObject(await ProductCombination.find({productId: product._id.toString()}));
    payload.combinations = [...combinations];
    const productOptions = await multipleMongooseToObject(await ProductOption.find({productId: product._id.toString()}));
    payload.options = [...productOptions.map(option => ({
        _id: option._id.toString(),
        name: option.name,
        values: []
    }))];
    const productOptionsValues = await multipleMongooseToObject(await ProductOptionValue.find({optionId: {$in: [...productOptions].map(option => (option._id))}}))
    productOptionsValues.forEach(item => {
        const index = payload.options.findIndex(option => option._id === item.optionId.toString());
        if (index !== -1) payload.options[index].values.push(item);

    })
    return payload;
}
module.exports = mongoose.model('Product', Product);
