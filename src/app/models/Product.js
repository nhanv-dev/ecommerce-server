const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const slug = require('mongoose-slug-generator');

mongoose.plugin(slug);

const Product = new Schema({
    name: {type: String, required: false},
    description: {type: String},
    sell_price: {type: Number, required: false},
    images: [],
    variants: [],
    bundle: [],
    tags: {type: Array, required: false},
    slug: {type: String, unique: true, slug: 'name'},
    category_id: {type: Schema.Types.ObjectId, required: false},
    seller_id: {type: Schema.Types.ObjectId, required: false},
}, {timestamps: true})

Product.statics.createProduct = async function (product) {
    try {
        const p = await this.create({...product});
        return p;
    } catch (error) {
        console.log(error)
    }
}

Product.statics.getProductById = async function (id) {
    // return products[0];
    return null;
}

Product.statics.getAll = async function (category) {
    // return products[0];
    return null;
}
module.exports = mongoose.model('Product', Product);
