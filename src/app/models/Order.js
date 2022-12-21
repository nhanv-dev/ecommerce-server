const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Order = new Schema({
    userId: {type: Schema.Types.ObjectId, required: true},
    shopId: {type: Schema.Types.ObjectId, required: true},
    addressId: {type: Schema.Types.ObjectId, required: true},
    note: {type: String, required: false},
    paymentMethod: {type: String, required: true},
    shippingMethod: {type: String, required: true},
    total: {type: Number, required: true},
    status: {type: String, required: false, default: 'Processing'},
    isFeedBack: {type: Boolean, default: false, required: false}
}, {timestamps: true});


Order.statics.saveOrder = async function (order) {
    return await this.create({
        userId: order.userId,
        shopId: order.shopId,
        addressId: order.addressId,
        note: order.note,
        paymentMethod: order.paymentMethod,
        shippingMethod: order.shippingMethod,
        total: order.total,
    });
}
Order.statics.updateOrder = async function (exportDate) {
    // if (!name) throw ({error: 'Name of order is not empty'});
    // return await this.update({name, exportDate});
}
Order.statics.deleteOrder = async function (id) {
    // if (!name) throw ({error: 'Name of order is not empty'});
    // return await this.create({id});
}
Order.statics.getAll = async function (limit) {
    const list = [];
    const parents = await this.find({parent: null}).limit(limit);
    list.push(...parents)
    for (const parent of parents) {
        const child = await this.find({parent: parent._id})
        list.push(...child)
    }
    return list;
}
Order.statics.getById = async function (id) {
    // const order = await this.findOne(id);
    // if (!order) throw ({error: 'No order with this id found'});
    // return order;
}
Order.statics.getOrderByShopID = async function (shopID) {
    const order = await this.findOne(shopID);
    if (!order) throw ({error: 'No order with this id found'});
    return order;
}


module.exports = mongoose.model('Order', Order);
