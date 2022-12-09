const categoryController = require('../app/controllers/CategoryController');
const router = require("express").Router();

router
    .get("/", categoryController.findAll)
    .get("/slug/:slug", categoryController.findBySlug)
    .get("/:id", categoryController.findOne)
    .post("/", categoryController.save)
    .put("/", categoryController.update)
    .put("/:id", categoryController.update)
    .delete("/:id", categoryController.delete)

module.exports = router;