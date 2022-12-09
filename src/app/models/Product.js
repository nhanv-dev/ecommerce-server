const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const slug = require('mongoose-slug-generator');
const {mongooseToObject} = require("../../utils/mongoose");

mongoose.plugin(slug);

const Product = new Schema({
<<<<<<< HEAD
    name: {type: String, required: true, trim: true},
    description: {type: String, trim: true},
    sellPrice: {type: Number, required: true},
    images: [{url: {type: String}}],
    tags: [{type: String}],
=======
    name: {type: String, required: false},
    description: {type: String},
    seller_price: {type: Number, required: true},
    images: [{type: String, required: true}],
    options: {type: Array},
    bundle: [{type: String}],
    tags: {type: Array, required: true},
    sellPrice: {type: Number, required: false},
    images: [],
    variants: [],
    bundle: [],
    tags: {type: Array, required: false},
>>>>>>> 70e432de511b7250956edd2855ff6eae8c1513e5
    slug: {type: String, unique: true, slug: 'name'},
    category_id: {type: Schema.Types.ObjectId},
    seller_id: {type: Schema.Types.ObjectId},
}, {timestamps: true})

<<<<<<< HEAD
Product.statics.saveProduct = async function (product) {
=======
Product.statics.createProduct = async function (product) {

>>>>>>> 70e432de511b7250956edd2855ff6eae8c1513e5
    try {
        const p = await this.create({...product});
        return p;
    } catch (error) {
        console.log(error)
    }
}

Product.statics.getProductById = async function (id) {
    try {
        const product = await this.findOne({_id: id});
        return new mongooseToObject(product);
    } catch (error) {
        console.log(error);
    }
    return null;
}

Product.statics.getAll = async function (category) {
    // return products[0];
    return null;
}
module.exports = mongoose.model('Product', Product);
