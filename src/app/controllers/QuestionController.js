const Question = require('../models/Question');

class QuestionController {

    async saveQuestion(req, res) {
        try {
            const {user} = req;
            const {productId, content} = req.body;
            console.log(user, productId, content)
            const question = await Question.saveQuestion({userId: user._id, productId, content});
            return res.status(200).json({question});
        } catch (err) {
            res.status(500).json(err);
        }
    }

    async saveAnswer(req, res) {
        try {
            const {user} = req;
            const {productId, content} = req.body;
            console.log(user, productId, content)
            // const question = await Question.save({});
            return res.status(200).json({user});
        } catch (err) {
            res.status(500).json(err);
        }
    }

    async findAll(req, res) {
        try {
            const {productId, page} = req.query;
            console.log(productId, page)
            const options = {page: page || 1, limit: 10,};
            const questions = await Question.findByProductId({productId, ...options})
            return res.status(200).json({success: true, questions});
        } catch (err) {
            res.status(500).json(err);
        }
    }
}

module.exports = new QuestionController