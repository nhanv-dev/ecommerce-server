const Evaluate = require('../models/Evaluate');

class EvaluateController {
    async saveEvaluate(req, res) {
        try {
            const {data} = req.body;
            await Evaluate.saveEvaluate(req.user._id.toString(), data.productId, data.images, data.content, data.starRating);
            return res.status(200).json({success: true, data});
        } catch (error) {
            return res.status(500).json({success: false, error: error});
        }
    }

    async findAll(req, res) {
        try {
            const data = await Evaluate.findByEvaluateId(req.body.productId);
            return res.status(200).json({success: true, data});
        } catch (error) {
            return res.status(500).json({success: false, error: error});
        }
    }
}

module.exports = new EvaluateController