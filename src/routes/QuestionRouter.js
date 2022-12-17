const questionController = require("../app/controllers/QuestionController");
const router = require("express").Router();

router
    .post("/", questionController.saveQuestion)
    .get("/product", questionController.findByProductId)

module.exports = router;