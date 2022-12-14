const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const ProductCombination = new Schema({
    combinationString: {type: String, required: true, trim: true},
    price: {type: Number, require: true},
    stock: {type: Number, require: true},
    productId: {type: Schema.Types.ObjectId, required: true},
}, {timestamps: true})


module.exports = mongoose.model('ProductCombination', ProductCombination);
