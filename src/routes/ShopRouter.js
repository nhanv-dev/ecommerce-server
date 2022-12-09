const shopController = require("../app/controllers/ShopController");
const router = require("express").Router();

router
    .get("/", shopController.findAll)
    .post("/", shopController.save)
    .put("/:id", shopController.findOne)
    .delete("/:id", shopController.findOne)
    .get("/:slug", shopController.findBySlug)

module.exports = router;