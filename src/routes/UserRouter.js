const userController = require("../app/controllers/UserController");
const {verifyToken} = require("../middlewares/verifyToken");
const router = require("express").Router();

router
    .get("/token", verifyToken, userController.findOne)
    .get("/:id", userController.findOne)
    .post("/create", userController.findOne)
    .put("/update", userController.findOne)
    .delete("/delete", userController.findOne)

module.exports = router;