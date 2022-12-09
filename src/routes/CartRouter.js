const {verifyToken} = require("../middlewares/verifyToken");
const cartController = require("../app/controllers/CartController");
const router = require("express").Router();

router.post("/add-to-cart", verifyToken, cartController.addToCart);

module.exports = router;