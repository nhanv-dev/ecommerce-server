const Order = require('../models/Order');
const OrderItem = require('../models/OrderItem');
const Cart = require('../models/Cart');
const CartItem = require('../models/CartItem');
const Product = require('../models/Product');
const {mongooseToObject, multipleMongooseToObject} = require("../../utils/mongoose");

class OrderController {
    async addOrder(req, res) {
        try {
            const {customerId} = req.body;
            if (!customerId) return res.status(200).json({success: false, message: "Account not empty"});
            const cart = await Cart.getCartByUserId(customerId);
            const cartItem = await CartItem.findOne({cartId: cart.id});
            const order = await Order.createOrder(customerId, cartItem.quantity, cart.total, new Date());
            const orderItem = await OrderItem.createOrderItem(order.id, cart.id);
            return res.status(200).json({success: true, message: 'Added order success'});
        } catch (error) {
            return res.status(500).json({success: false, error: error});
        }
    }

    async getOrderByShopID(req, res) {
        try {
            const {shopId} = req.query;
            console.log(await Product.find({shopId: shopId}),shopId);
            return res.status(200).json({success: true, message: 'get order success'});
        } catch (error) {
            return res.status(500).json({success: false, error: error});
        }
    }
}

module.exports = new OrderController