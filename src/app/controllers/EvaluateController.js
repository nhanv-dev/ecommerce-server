const Evaluate = require('../models/Evaluate');
const User = require('../models/User');
const {multipleMongooseToObject} = require("../../utils/mongoose");

class EvaluateController {
    async saveEvaluate(req, res) {
        try {
            const {data} = req.body;
            await Evaluate.saveEvaluate(req.user._id.toString(), data.productId, data.images, data.content, data.rating);
            return res.status(200).json({success: true, data});
        } catch (error) {
            return res.status(500).json({success: false, error: error});
        }
    }

    async findByProductId(req, res) {
        try {
            const evaluates = await multipleMongooseToObject(await Evaluate.findByEvaluateId(req.params.productId))
            const users = await multipleMongooseToObject(await User.find({_id: {$in: [...evaluates.map(e => e.userId.toString())]}}))
            const payload = [...evaluates].map(e => {
                const user = [...users].filter(u => u._id.toString() === e.userId.toString())[0]
                return {
                    ...e, user: {...user}
                }
            })
            return res.status(200).json({success: true, evaluates: payload});
        } catch (error) {
            return res.status(500).json({success: false, error: error});
        }
    }
}

module.exports = new EvaluateController