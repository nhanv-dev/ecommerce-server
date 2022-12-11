const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const CartItem = new Schema({
    cartId: {type: Schema.Types.ObjectId, required: true},
    productId: {type: Schema.Types.ObjectId, required: true},
    quantity: {type: Number, required: true},
    price: {type: Number, required: true},
    discount: {type: Schema.Types.ObjectId, required: false}
});

CartItem.statics.saveCartItem = async function (cartItem) {
    return await this.create({...cartItem});
}

CartItem.statics.getCartItemById = async function (cartId, productId) {
    return await this.findOne({cartId: cartId, productId: productId});
}
CartItem.statics.updateCartItem = async function (cartId, productId, quantity) {
    await this.updateOne({cartId: cartId, productId: productId}, {$set: {quantity: quantity}});
    return await this.findOne({cartId: cartId, productId: productId});
}

module.exports = mongoose.model('CartItem', CartItem);