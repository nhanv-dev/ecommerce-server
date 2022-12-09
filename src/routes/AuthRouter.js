const authController = require("../app/controllers/AuthController");
const router = require("express").Router();

router
    .post("/register", authController.register)
    .post("/login", authController.login)

module.exports = router;