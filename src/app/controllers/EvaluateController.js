const Evaluate = require('../models/Evaluate');

class EvaluateController {
    async saveEvaluate(req, res) {
        try {
            const {data} = req.body;
            return res.status(200).json({success: true, data});
        } catch (error) {
            return res.status(500).json({success: false, error: error});

        }
    }

    async findAll(req, res) {

    }
}

module.exports = new EvaluateController