const userController = require("../app/controllers/UserController");
const {verifyToken} = require("../middlewares/verifyToken");
const router = require("express").Router();

router
    .get("/token", verifyToken, userController.findOne)
    .get("/:id", userController.findOne)
    .post("/", userController.create)
    .put("/update", userController.update)
    .delete("/delete", userController.findOne)
    .post("/account-register", userController.registerAccount)
    .post("/forget-password", userController.forgetPassword)
    .put("/active-account", userController.activeAccount)


module.exports = router;
