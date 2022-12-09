const userController = require("../app/controllers/UserController");
const router = require("express").Router();

router
    .get("/:id", userController.findOne)
    .post("/create", userController.create)
    .put("/update", userController.update)
    .delete("/delete", userController.findOne)
<<<<<<< Updated upstream
    .post("/account-register", userController.registerAccount)
    .post("/forget-password", userController.forgetPassword)
    .put("/active-account", userController.activeAccount)
module.exports = router;
=======

    .post("/forget-password", userController.forgetPassword)
    .put("/active-account", userController.activeAccount)

module.exports = router;
>>>>>>> Stashed changes
