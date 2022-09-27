const productController = require("../app/controllers/ProductController");
const router = require("express").Router();

router.get("/", productController.findOne)

module.exports = router;