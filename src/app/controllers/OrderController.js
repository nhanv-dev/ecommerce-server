const Order = require('../models/Order');
const OrderItem = require('../models/OrderItem');
const Cart = require('../models/Cart');
const CartItem = require('../models/CartItem');
const User = require('../models/User');
const Shop = require('../models/Shop');
const UserAddress = require('../models/UserAddress');
const Product = require('../models/Product');
const ProductCombination = require('../models/ProductCombination');
const {mongooseToObject, multipleMongooseToObject} = require("../../utils/mongoose");

class OrderController {

    async addOrder(req, res) {
        try {
            const user = req.user;
            const {items, address, note, paymentMethod, shippingMethod} = req.body;
            const array = [];
            items.forEach(item => {
                const a = array.filter(obj => obj?.shop?._id === item.shop?._id)
                if (a.length > 0) {
                    array.forEach(obj => obj?.shop?._id === item?.shop?._id && obj.items.push({...item}))
                } else {
                    array.push({shop: {...item.shop}, items: [{...item}]})
                }
            });
            const payload = [];
            array.map(async obj => {
                let total = 0;
                obj.items.forEach(item => {
                    total += ((item.combination?.price || item.product.basePrice) * item.quantity) * (100 - item.product.discountPercent) / 100
                });
                const order = await mongooseToObject(await Order.saveOrder({
                    userId: user._id,
                    total,
                    shopId: obj.shop._id.toString(),
                    note, paymentMethod, shippingMethod,
                    addressId: address._id,
                }));
                const orderItems = await multipleMongooseToObject(await OrderItem.insertMany(
                    obj.items.map(item => {
                        const price = ((item.combination?.price || item.product.basePrice) * item.quantity) * (100 - item.product.discountPercent) / 100
                        return {
                            orderId: order._id.toString(),
                            productId: item.productId,
                            combinationId: item.combinationId,
                            quantity: item.quantity,
                            price,
                        }
                    })
                ));
                payload.push({...order, items: [...orderItems]});
            });
            items.map(async item => {
                const combinationId = item.combinationId;
                const productCombination = await ProductCombination.findOne({_id: combinationId});
                const stock = parseInt(productCombination.stock) - parseInt(item.quantity);
                await ProductCombination.updateOne({_id: combinationId}, {$set: {stock: stock}});
            });
            await CartItem.deleteMany({
                cartId: {$in: [...items.map(item => item.cartId)]},
                productId: {$in: [...items.map(item => item.productId)]},
                combinationId: {$in: [...items.map(item => item.combinationId)]},
            });
            return res.status(200).json({success: true, orders: payload});

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

    async findOrderByUserId(req, res) {
        try {
            const user = req.user;
            const payload = {orders: []};
            const orders = await multipleMongooseToObject(await Order.find({userId: user._id}));
            let orderItems = await multipleMongooseToObject(await OrderItem.find({
                orderId: {$in: [...orders.map(order => order._id.toString())]}
            }))
            let products = await multipleMongooseToObject(await Product.find({
                _id: {$in: [...orderItems.map(item => item.productId)]}
            }));
            const shops = await multipleMongooseToObject(await Shop.find({
                _id: {$in: [...products.map(product => product.shopId)]}
            }));
            products = products.map(product => {
                const shop = shops.filter(item=> product.shopId.toString() === item._id.toString());
                return {
                    ...product,
                    shop: shop.length > 0 && shop[0],
                }
            })
            const combinations = await multipleMongooseToObject(await ProductCombination.find({
                _id: {$in: [...orderItems.map(item => item.combinationId)]}
            }));
            const address = await mongooseToObject(await UserAddress.findOne({
                _id: {$in: [...orders.map(order => order.addressId.toString())]}
            }));
            for (const order of orders) {
                const items = orderItems
                    .filter(item => item.orderId.toString() === order._id.toString())
                    .map(item => {
                        const product = products.filter(p => item.productId.toString() === p._id.toString());
                        const combination = combinations.filter(c => item.combinationId?.toString() === c._id.toString());
                        return {
                            ...item,
                            product: product.length > 0 && product[0],
                            combination: combination.length > 0 && combination[0],
                        };
                    });
                const o = {...order, address, items};
                payload.orders.push(o);
            }
            return res.status(200).json({success: true, orders: payload.orders});
        } catch (error) {
            console.log(error)
            return res.status(500).json({success: false, error: error});
        }
    }
}

module.exports = new OrderController