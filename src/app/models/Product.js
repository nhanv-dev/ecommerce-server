const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const slug = require('mongoose-slug-generator');

mongoose.plugin(slug);

const Product = new Schema({
    name: {type: String, required: true, trim: true},
    description: {type: String, trim: true},
    sellPrice: {type: Number, required: true},
    images: [{url: {type: String}}],
    tags: [{type: String}],
    slug: {type: String, unique: true, slug: 'name'},
    category_id: {type: Schema.Types.ObjectId},
    seller_id: {type: Schema.Types.ObjectId},
}, {timestamps: true})

Product.statics.saveProduct = async function (product) {
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
