const productController = require("../app/controllers/ProductController");
const router = require("express").Router();

router
    .get("/", productController.findAll)
    .post("/", productController.save)
    .put("/:id", productController.findOne)
    .delete("/:id", productController.findOne)
    .get("/:id", productController.findOne)


module.exports = router;