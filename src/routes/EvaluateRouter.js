const evaluateController = require('../app/controllers/EvaluateController');
const router = require("express").Router();

router
    .get("/", evaluateController.findAll)
