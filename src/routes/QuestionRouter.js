const questionController = require("../app/controllers/QuestionController");
const {verifyToken, verifyTokenAndAdmin} = require("../middlewares/verifyToken");
const router = require("express").Router();

router
    .get("/", questionController.findAll)
    .post("/", verifyToken, questionController.saveQuestion)
    .post("/answers", verifyToken, questionController.saveAnswer)

module.exports = router;