const shopController = require("../app/controllers/ShopController");
const {verifyToken, verifyTokenShop} = require("../middlewares/verifyToken");
const router = require("express").Router();

router
    .post("/", shopController.save)
    .put("/:id", shopController.findOne)
    .delete("/:id", shopController.findOne)
    .get("/", shopController.findAll)
    .get("/detail", verifyTokenShop, shopController.findByAccountId)
    .get("/products", verifyToken, shopController.findProducts)
    .get("/:slug", shopController.findBySlug)

module.exports = router;