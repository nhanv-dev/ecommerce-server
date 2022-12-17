const Answer = require('../models/Answer');
const jwt = require("jsonwebtoken");

class QuestionController {

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

}

module.exports = new QuestionController