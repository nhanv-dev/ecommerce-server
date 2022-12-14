const categoryController = require('../app/controllers/CategoryController');
const router = require("express").Router();

router
    .get("/", categoryController.findAll)
    .get("/parents", categoryController.findParent)
    .get("/children", categoryController.findChildren)
    .get("/:slug", categoryController.findBySlug)
    .post("/", categoryController.save)
    .put("/", categoryController.update)
    .put("/:id", categoryController.update)
    .delete("/:id", categoryController.delete)

module.exports = router;