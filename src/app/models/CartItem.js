const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const CartItem = new Schema({
    cartId: {type: Schema.Types.ObjectId, required: true},
    productId: {type: Schema.Types.ObjectId, required: true},
    combinationId: {type: Schema.Types.ObjectId},
    quantity: {type: Number, required: true},
});

CartItem.statics.saveCartItem = async function (item) {
    return await this.create({
        cartId: item.cartId,
        productId: item.productId,
        combinationId: item.combinationId,
        quantity: item.quantity,
    });
}

CartItem.statics.updateCartItem = async function (item) {
    await this.updateOne({
        cartId: item.cartId,
        productId: item.productId,
        combinationId: item.combinationId
    }, {$set: {quantity: item.quantity}});
    return await this.findOne({
        cartId: item.cartId,
        productId: item.productId,
        combinationId: item.combinationId
    });
}

CartItem.statics.findCartItemById = async function (cartId, productId, combinationId) {
    return await this.findOne({cartId, productId, combinationId});
}


module.exports = mongoose.model('CartItem', CartItem);