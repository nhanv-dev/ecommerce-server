const productController = require("../app/controllers/ProductController");
const router = require("express").Router();

router.get("/", productController.findAll)
router.post("/", productController.create)
router.put("/:id", productController.findOne)
router.delete("/:id", productController.findOne)

module.exports = router;