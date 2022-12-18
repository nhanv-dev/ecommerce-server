const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const Cart = new Schema({
    customerId: {type: Schema.Types.ObjectId, required: true},
    createdAt: {type: Date, default: new Date(), required: true},
    status: {type: String, default: "Processing", required: true},
    total: {type: Number, required: true}
}, {timestamps: true});

Cart.statics.saveCart = async function (customerId, createdAt, total) {
    return await this.create({customerId, createdAt, total});
}
Cart.statics.getCartByUserId = async function (id) {
    return await this.findOne({customerId: id});
}
Cart.statics.updateCart = async function (userId, total) {
    await this.updateOne({customerId: userId}, {$set: {total: total}});
    return await this.getCartByUserId(userId);
}

module.exports = mongoose.model('Cart', Cart);