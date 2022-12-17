const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const ProductOption = new Schema({
    name: {type: String, required: true, trim: true},
    productId: {type: Schema.Types.ObjectId, required: true},
}, {timestamps: true})

ProductOption.statics.saveProductOption = async function (productOption) {
    return await this.create({...productOption});
}

ProductOption.statics.findByProductId = async function (_id) {
    return await this.findOne({productId: _id});
}

module.exports = mongoose.model('ProductOption', ProductOption);
