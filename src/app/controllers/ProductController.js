const Product = require('../models/Product');
const {multipleMongooseToObject, mongooseToObject} = require('../../utils/mongoose');

class ProductController {
    async create(req, res) {
        try {
            const product = await Product.createProduct(req.body.product);
            return res.status(200).json({success: true, product: await multipleMongooseToObject(product)});
        } catch (error) {
            return res.status(500).json({success: false, error: error});
        }
    }

    async findAll(req, res) {
        try {
            const {category} = req.query;
            // const product = await Product.getAll(category);
            return res.status(200).json({success: true});
        } catch (error) {
            return res.status(500).json({success: false, error: error});
        }
    }

    async findOne(req, res) {
        try {

            const product = await Product.getProductById(req.param.id);
            return res.status(200).json({success: true, category: await multipleMongooseToObject(category)});
        } catch (error) {
            return res.status(500).json({success: false, error: error});
        }
    }
}

module.exports = new ProductController