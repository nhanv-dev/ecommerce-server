const Product = require('../models/Product');
const {multipleMongooseToObject, mongooseToObject} = require('../../utils/mongoose');

class ProductController {
    async findAll() {

    }

<<<<<<< Updated upstream
    async findOne() {

=======
    async findOne(req, res) {
        try {
            const product = await Product.getProductById(req.param.id);
            return res.status(200).json({success: true, category: await multipleMongooseToObject(category)});
        } catch (error) {
            return res.status(500).json({success: false, error: error});
        }
>>>>>>> Stashed changes
    }
}

module.exports = new ProductController