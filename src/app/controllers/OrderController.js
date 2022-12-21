const Order = require('../models/Order');
const OrderItem = require('../models/OrderItem');
const Cart = require('../models/Cart');
const CartItem = require('../models/CartItem');
const User = require('../models/User');
const UserAddress = require('../models/UserAddress');
const Product = require('../models/Product');
const ProductCombination = require('../models/ProductCombination');
const {mongooseToObject, multipleMongooseToObject} = require("../../utils/mongoose");

class OrderController {

    async addOrder(req, res) {
        try {
            const user = req.user;
            const {items, total, address, note, paymentMethod, shippingMethod} = req.body;
            const order = await mongooseToObject(await Order.saveOrder({
                userId: user._id,
                total, note, paymentMethod, shippingMethod,
                addressId: address._id,
            }));
            const orderItems = await multipleMongooseToObject(await OrderItem.insertMany(
                items.map(item => {
                    const price = ((item.combination?.price || item.product.basePrice) * item.quantity) * (100 - item.product.discountPercent) / 100
                    return {
                        orderId: order._id.toString(),
                        productId: item.productId,
                        combinationId: item.combinationId,
                        quantity: item.quantity,
                        price,
                    }
                })
            ))
            return res.status(200).json({success: true, order: {...order, items: [...orderItems]}});
        } catch (error) {
            console.log(error)
            return res.status(500).json({success: false, error: error});
        }
    }

    async findOrderByShopID(req, res) {
        try {
            const {shopId} = req.query;
            console.log(await Product.find({shopId: shopId}), shopId);
            return res.status(200).json({success: true, message: 'get order success'});
        } catch (error) {
            return res.status(500).json({success: false, error: error});
        }
    }

    async findOrderById(req, res) {
        try {
            const {id} = req.params;
            const order = await mongooseToObject(await Order.findOne({_id: id}));
            let orderItems = await multipleMongooseToObject(await OrderItem.find({orderId: order._id.toString()}));
            const products = await multipleMongooseToObject(await Product.find({
                _id: {$in: [...orderItems.map(item => item.productId)]}
            }));
            const combinations = await multipleMongooseToObject(await ProductCombination.find({
                _id: {$in: [...orderItems.map(item => item.combinationId)]}
            }));
            orderItems = orderItems.map(item => {
                const product = products.filter(p => item.productId.toString() === p._id.toString());
                const combination = combinations.filter(c => item.combinationId?.toString() === c._id.toString());
                return {
                    ...item,
                    product: product.length > 0 && product[0],
                    combination: combination.length > 0 && combination[0],
                };
            });
            const address = await mongooseToObject(await UserAddress.findOne({_id: order.addressId.toString()}));
            return res.status(200).json({success: true, order: {...order, address, items: [...orderItems]}});
        } catch (error) {
            return res.status(500).json({success: false, error: error});
        }
    }
}

module.exports = new OrderController