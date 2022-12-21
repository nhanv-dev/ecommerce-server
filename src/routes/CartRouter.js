const {verifyToken} = require("../middlewares/verifyToken");
const cartController = require("../app/controllers/CartController");
const router = require("express").Router();

router
    .get("/all-items", verifyToken, cartController.findByUserId)
    .post("/add-items", verifyToken, cartController.addToCart)
    .post("/update-quantity", verifyToken, cartController.updateQuantity)

module.exports = router;