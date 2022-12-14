const authController = require("../app/controllers/AuthController");
const {verifyToken} = require("../middlewares/verifyToken");
const router = require("express").Router();

router
    .post("/login", authController.login)
    .post("/register", authController.register)
    .post("/register-shop", authController.registerShop)
    .post("/re-login", verifyToken, authController.reLogin)

module.exports = router;