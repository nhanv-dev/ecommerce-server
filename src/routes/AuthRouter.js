const authController = require("../app/controllers/AuthController");
const {verifyToken} = require("../middlewares/verifyToken");
const router = require("express").Router();

router
    .post("/register", authController.register)
    .post("/login", authController.login)
    .post("/re-login", verifyToken, authController.reLogin)

module.exports = router;