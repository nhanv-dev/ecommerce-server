const Order = require('../models/Order');
const OrderItem = require('../models/OrderItem');
const Product = require('../models/Product');
const Category = require('../models/Category');
const {multipleMongooseToObject} = require("../../utils/mongoose");

class StatisticalsController {
    async daily(req, res) {
        try {
            const {shopId} = req.query;
            const orders = await multipleMongooseToObject(await Order.find({shopId}));
            let payload = [];
            orders.forEach(order => {
                const createdAt = new Date(order.createdAt).toISOString().substring(0, 10);
                const isExist = payload.filter(item => item.createdAt === createdAt);
                if (isExist.length > 0) {
                    payload = payload.map(item => {
                        if (item.createdAt === isExist[0].createdAt) return {...item, total: item.total + order.total}
                        else return {...item}
                    })
                } else {
                    payload.push({createdAt, total: order.total})
                }
            })

            return res.status(200).json({success: true, daily: payload});
        } catch
            (error) {
            return res.status(500).json({success: false, error: error});
        }
    }

    async category(req, res) {
        try {
            const {shopId} = req.query;
            const orders = await multipleMongooseToObject(await Order.find({shopId}));
            let ordersItems = await multipleMongooseToObject(await OrderItem.find({
                orderId: {$in: orders.map(o => o._id.toString())}
            }))
            const products = await multipleMongooseToObject(await Product.find({
                _id: {$in: ordersItems.map(item => item.productId.toString())}
            }))
            const categories = await multipleMongooseToObject(await Category.find({
                _id: {$in: products.map(item => item.categoryId.toString())}
            }))
            ordersItems = ordersItems.map(item => {
                const product = products.filter(p => p._id.toString() === item.productId.toString())[0];
                const category = categories.filter(p => p._id.toString() === product.categoryId.toString())[0];
                return {...item, product, category}
            })
            let payload = [];
            ordersItems.forEach(item => {
                    const isExist = payload.filter(item => item.category._id.toString() === item.category._id.toString());
                    // console.log("com", item.category._id.toString(), isExist[0].category._id.toString())
                    if (isExist.length > 0) {
                        payload = payload.map((i) => {
                            console.log("jere", i.category._id.toString(),)
                            if (i.category._id.toString() === isExist[0].category._id.toString()) {

                                return {
                                    ...i,
                                    total: item.price * item.quantity + i.total
                                }
                            } else return {...i}
                        })
                    } else {
                        console.log("push", item.category._id.toString())
                        payload.push({
                            category: {...item.category},
                            total: item.price * item.quantity
                        })
                    }
                }
            )
            console.log(payload)

            return res.status(200).json({success: true, payload: payload});
        } catch
            (error) {
            return res.status(500).json({success: false, error: error});
        }
    }
}

module.exports = new StatisticalsController
