const answerController = require("../app/controllers/AnswerController");
const router = require("express").Router();

router
    .post("/", answerController.saveAnswer)

module.exports = router;