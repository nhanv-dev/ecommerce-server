const orderController = require('../app/controllers/OrderController');
const {verifyToken} = require("../middlewares/verifyToken");
const router = require("express").Router();

router
    .post('/', verifyToken, orderController.addOrder)
    .get('/order-shop-id', orderController.findOrderByShopID)
    .get('/id/:id', orderController.findOrderById)

module.exports = router;