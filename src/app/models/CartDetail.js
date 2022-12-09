const mongoose = require('mongoose')
const {multipleMongooseToObject, mongooseToObject} = require('../../utils/mongoose')
const Schema = mongoose.Schema;

const CartDetail = new Schema({
    cartId: {type: Schema.Types.ObjectId, required: true},
    productId: {type: Schema.Types.ObjectId, required: true},
    quantity: {type: Number, required: true},
    price: {type: Number, required: true},
    discount: {type: Schema.Types.ObjectId, required: false}
});
CartDetail.statics.updateCartDetail = async function (cartId, productId, quantity) {
    await this.updateOne({cartId: cartId, productId: productId}, {$set: {quantity: quantity}});
    return await this.findOne({cartId: cartId, productId: productId});
}
module.exports = mongoose.model('CartDetail', CartDetail);