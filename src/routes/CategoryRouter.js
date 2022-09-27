const categoryController = require('../app/controllers/CategoryController');
const router = require("express").Router();

router
    .get("/", categoryController.findAll)
    .post("/", categoryController.create)
    .put("/:id", categoryController.update)
    .delete("/:id", categoryController.delete)
    .get("/:id", categoryController.findOne)
    .get("/:slug", categoryController.findBySlug)
    .get("/:id/comments", categoryController.findOne)

module.exports = router;