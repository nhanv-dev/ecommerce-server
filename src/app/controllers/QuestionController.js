const Question = require('../models/Question');
const jwt = require("jsonwebtoken");

class QuestionController {

    async saveQuestion(req, res) {
        try {
            const payload = {userId: null};
            const authHeader = req.headers.token;
            if (authHeader) {
                await jwt.verify(authHeader.split(" ")[1], 'RESTFULAPIs', (err, user) => {
                    if (!err) payload.userId = user._id;
                }, null);
            }
            const {productId, content} = req.body;
            const question = await Question.saveQuestion({userId: payload.userId, productId, content});
            return res.status(200).json({success: true, question});
        } catch (err) {
            res.status(500).json(err);
        }
    }

    async findByProductId(req, res) {
        try {
            const {productId, page} = req.query;
            const options = {page: page || 1, limit: 12,};
            const questions = await Question.findByProductId({productId, ...options})
            return res.status(200).json({success: true, questions});
        } catch (err) {
            res.status(500).json(err);
        }
    }
}

module.exports = new QuestionController