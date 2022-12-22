const statisticalsController = require('../app/controllers/StatisticalsController');
const {verifyToken} = require("../middlewares/verifyToken");
const router = require("express").Router();
router
    .get("/daily", verifyToken, statisticalsController.daily)
    .get("/category",  statisticalsController.category)
module.exports = router;