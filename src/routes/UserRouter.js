const userController = require("../app/controllers/UserController");
const {verifyToken} = require("../middlewares/verifyToken");
const router = require("express").Router();

router
    .get("/addresses", verifyToken, userController.findAddresses)
    .post("/addresses/set-default", verifyToken, userController.setDefaultAddress)
    .post("/addresses", verifyToken, userController.saveAddresses)
    .post("/", userController.create)
    .put("/update", userController.update)
    .post("/account-register", userController.registerAccount)
    .post("/forget-password", userController.forgetPassword)
    .post("/confirm-password", userController.resetPassword)
    .put("/active-account", userController.activeAccount)
    .get("/:id", userController.findInformation)


module.exports = router;
