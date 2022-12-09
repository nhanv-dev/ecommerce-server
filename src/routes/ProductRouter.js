const productController = require("../app/controllers/ProductController");
const router = require("express").Router();

<<<<<<< HEAD
router
    .get("/", productController.findAll)
    .post("/", productController.save)
    .put("/:id", productController.findOne)
    .delete("/:id", productController.findOne)
    .get("/:id", productController.findOne)
=======

router.get("/", productController.findAll)
router.post("/", productController.create)
router.put("/:id", productController.findOne)
router.delete("/:id", productController.findOne)
>>>>>>> 70e432de511b7250956edd2855ff6eae8c1513e5

module.exports = router;