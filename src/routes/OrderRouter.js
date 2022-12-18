const orderController = require('../app/controllers/OrderController');
const router = require("express").Router();

router
    .post('/', orderController.addOrder)
    .get('/order-shop-id', orderController.getOrderByShopID)

module.exports = router;