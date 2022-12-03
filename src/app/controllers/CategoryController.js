const Category = require('../models/Category');
const {multipleMongooseToObject, mongooseToObject} = require('../../utils/mongoose');

class CategoryController {
    async create(req, res) {
        try {
            const {name, parent, items} = req.body;
            items.map(async (item) => {
                const category = await Category.createCategory(item, parent);
            })
            return res.status(200).json({success: true});
        } catch (error) {
            return res.status(500).json({success: false, error: error});
        }
    }

    async update(req, res) {
        try {
            const {name, parent} = req.body;
            const category = await Category.updateCategory(name, parent);
            return res.status(200).json({success: true, category: await mongooseToObject(category)});
        } catch (error) {
            return res.status(500).json({success: false, error: error});
        }
    }

    async delete(req, res) {
        try {
            const {id} = req.body;
            const category = await Category.deleteCategory(id);
            return res.status(200).json({success: true});
        } catch (error) {
            return res.status(500).json({success: false, error: error});
        }
    }

    async findAll(req, res) {
        try {
            const result = await Category.getAll();
            const categories = (await multipleMongooseToObject(result)).filter(category => category.name && category.slug)
            return res.status(200).json({success: true, categories: categories});
        } catch (error) {
            return res.status(500).json({success: false, error: error});
        }
    }

    async findOne(req, res) {
        try {
            const category = await Category.getCategoryById(req.param.id);
            return res.status(200).json({success: true, category: await multipleMongooseToObject(category)});
        } catch (error) {
            return res.status(500).json({success: false, error: error});
        }
    }

    async findBySlug(req, res) {
        try {
            const category = await Category.getCategoryById();
            return res.status(200).json({success: true, category: await multipleMongooseToObject(category)});
        } catch (error) {
            return res.status(500).json({success: false, error: error});
        }
    }
}

module.exports = new CategoryController