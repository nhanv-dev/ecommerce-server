const mongoose = require('mongoose')
const {mongooseToObject} = require("../../utils/mongoose");
const Schema = mongoose.Schema;

const Cart = new Schema({
    customerId: {type: String, required: false},
    paymentId: {type: String, required: false},
    orderDate: {type: Date, required: false},
    deliveryDate: {type: Date, required: false},
    deliveryAddress: {type: String, required: false},
    note: {type: String, required: false},
    paymentStatus: {type: String, defaultL: false},
    deliveryStatus: {type: String, defaultL: false},
    total: {type: Number, required: true}
}, {timestamps: true});

Cart.statics.getCartByUserId = async function (id) {
    return await this.findOne({customerId: id});
}
Cart.statics.updateCart = async function (userId, total) {
    await this.updateOne({customerId: userId}, {$set: {total: total}});
    return await this.getCartByUserId(userId);
}
module.exports = mongoose.model('Cart', Cart);