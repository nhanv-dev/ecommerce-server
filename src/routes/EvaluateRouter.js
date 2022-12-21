const evaluateController = require('../app/controllers/EvaluateController');
const {verifyToken} = require("../middlewares/verifyToken");
const router = require("express").Router();

router
    .get("/productId/:productId", evaluateController.findByProductId)
    .post("/", verifyToken, evaluateController.saveEvaluate)

module.exports = router;