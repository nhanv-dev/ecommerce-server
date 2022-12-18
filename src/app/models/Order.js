const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const slug = require('mongoose-slug-generator');

mongoose.plugin(slug);

const Order = new Schema({
    customerId: Schema.Types.ObjectId,
    quantity: {type: Number, required: true},
    amount: {type: Number, required: true},
    exportDate: {type: Date, required: true}
}, {timestamps: true});


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

Order.statics.createOrder = async function (customerId, quantity, amount, exportDate) {
    if (!customerId) throw ({error: 'Name of order is not empty'});
    const isExist = await this.findOne({customerId});
    if (isExist) throw ({error: 'Order is exist in database'});
    return await this.create({customerId, quantity, amount, exportDate});
}

Order.statics.updateOrder = async function (exportDate) {
    // if (!name) throw ({error: 'Name of order is not empty'});
    // return await this.update({name, exportDate});
}

Order.statics.deleteOrder = async function (id) {
    // if (!name) throw ({error: 'Name of order is not empty'});
    // return await this.create({id});
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
