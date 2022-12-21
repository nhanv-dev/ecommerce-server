const questionController = require("../app/controllers/QuestionController");
const {verifyToken} = require("../middlewares/verifyToken");
const router = require("express").Router();

router
    .post("/", questionController.saveQuestion)
    .get("/product", questionController.findByProductId)
    .get("/user", verifyToken, questionController.findByUserId)

module.exports = router;