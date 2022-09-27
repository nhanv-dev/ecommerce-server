const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const slug = require('mongoose-slug-generator');

mongoose.plugin(slug);

const Product = new Schema({
    name: {type: String, unique: true, required: true},
    description: {type: String},
    seller_price: {type: Number, required: true},
    images: [{type: String, required: true}],
    options: {type: Array},
    bundle: [{type: String}],
    tags: {type: Array, required: true},
    slug: {type: String, unique: true, slug: 'name'},
    category_id: {type: Schema.Types.ObjectId, required: true},
    seller_id: {type: Schema.Types.ObjectId, required: true},

}, {timestamps: true})

Product.statics.createProduct = async function (product) {
    return {name, parent};
}

module.exports = mongoose.model('Product', Product);
