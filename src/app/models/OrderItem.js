const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const OrderItem = new Schema({
    orderId: {type: Schema.Types.ObjectId, required: true},
    productId: {type: Schema.Types.ObjectId, required: true},
    combinationId: {type: Schema.Types.ObjectId, required: false},
    price: {type: Number, required: true},
    quantity: {type: Number, required: true},
    isFeedBack: {type: Boolean, default: false, required: false}
}, {timestamps: true});


OrderItem.statics.getAll = async function (limit) {
    const list = [];
    const parents = await this.find({parent: null}).limit(limit);
    list.push(...parents)
    for (const parent of parents) {
        const child = await this.find({parent: parent._id})
        list.push(...child)
    }
    return list;
}

OrderItem.statics.createOrderItem = async function (orderID, cartID) {
    return await this.create({orderID, cartID});
}

OrderItem.statics.updateOrderItem = async function (id, name, parent) {
    if (!name) throw ({error: 'Name of category is not empty'});
    return await this.update({name, parent});
}

OrderItem.statics.deleteOrderItem = async function (id) {
    if (!name) throw ({error: 'Name of category is not empty'});
    return await this.create({id});
}

OrderItem.statics.getById = async function (id) {
    const orderItem = await this.findOne(id);
    if (!orderItem) throw ({error: 'No category with this id found'});
    return orderItem;
}

module.exports = mongoose.model('OrderItem', OrderItem);
