const Answer = require('../models/Answer');
const Product = require('../models/Product');
const {mongooseToObject} = require("../../utils/mongoose");

class QuestionController {

    async saveAnswer(req, res) {
        try {
            const {content, accountId, productId, shopId, questionId} = req.body;
            const product = await mongooseToObject(await Product.findOne({_id: productId, shopId}));
            if (!product) return res.status(400).json({
                success: false,
                message: "You don't have permission or Product is not in your store"
            });
            const answer = await Answer.saveAnswer({accountId, shopId, productId, content,questionId});
            return res.status(200).json({success: true, answer});
        } catch (err) {
            res.status(500).json(err);
        }
    }

}

module.exports = new QuestionController