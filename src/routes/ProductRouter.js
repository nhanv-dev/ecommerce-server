const productController = require("../app/controllers/ProductController");
const router = require("express").Router();

<<<<<<< Updated upstream
router.get("/", productController.findOne)

=======
router.get("/", productController.findAll)
router.post("/", productController.create)
router.put("/:id", productController.findOne)
router.delete("/:id", productController.findOne)
>>>>>>> Stashed changes
module.exports = router;