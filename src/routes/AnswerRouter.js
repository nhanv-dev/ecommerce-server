const answerController = require("../app/controllers/AnswerController");
const {verifyTokenShop} = require("../middlewares/verifyToken");
const router = require("express").Router();

router
    .post("/", verifyTokenShop, answerController.saveAnswer)
    .put("/", verifyTokenShop, answerController.saveAnswer)
    .delete("/:id", verifyTokenShop, answerController.saveAnswer)


module.exports = router;