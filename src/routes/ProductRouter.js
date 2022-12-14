const productController = require("../app/controllers/ProductController");
const {verifyTokenShop} = require("../middlewares/verifyToken");
const router = require("express").Router();

router
    .post("/", verifyTokenShop, productController.save)
    .put("/:id", verifyTokenShop, productController.update)
    .delete("/:id", verifyTokenShop, productController.findOne)
    .get("/", productController.findOne)
    .get("/all", productController.findAll)


module.exports = router;