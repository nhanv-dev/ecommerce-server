const shopController = require("../app/controllers/ShopController");
const {verifyToken, verifyTokenShop} = require("../middlewares/verifyToken");
const router = require("express").Router();

router
    .get("/detail", verifyTokenShop, shopController.findByAccountId)
    .get("/product", shopController.findRelatedByProductId)
    .get("/products", verifyTokenShop, shopController.findProducts)
    .get("/v-products",  shopController.findProductsByShopId)
    .get("/:slug", shopController.findBySlug)
    .get("/", shopController.findAll)
    .post("/", shopController.save)
    .put("/:id", shopController.findOne)
    .delete("/:id", shopController.findOne)

module.exports = router;