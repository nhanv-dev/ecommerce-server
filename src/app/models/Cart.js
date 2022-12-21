const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const Cart = new Schema({
    userId: {type: Schema.Types.ObjectId, required: true},
}, {timestamps: true});

Cart.statics.saveCart = async function (cart) {
    return await this.create({userId: cart.userId});
}
Cart.statics.findCartByUserId = async function (userId) {
    return await this.findOne({userId: userId});
}

module.exports = mongoose.model('Cart', Cart);