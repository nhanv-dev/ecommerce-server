const userController = require("../app/controllers/UserController");
const router = require("express").Router();

router
    .get("/:id", userController.findOne)
    .post("/create", userController.findOne)
    .put("/update", userController.findOne)
    .delete("/delete", userController.findOne)
    .get("/", userController.findOne)

module.exports = router;