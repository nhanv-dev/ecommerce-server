const Category = require('../models/Category');
const {multipleMongooseToObject, mongooseToObject} = require('../../utils/mongoose');

class CategoryController {

    async save(req, res) {
        try {
            const {name, parent} = req.body;
            const category = await Category.saveCategory(name, parent);
            return res.status(200).json({success: true, category});
        } catch (error) {
            return res.status(500).json({success: false, error: error});
        }
    }

    async update(req, res) {
        try {
            const {name, parent} = req.body;
            // const category = await Category.updateMany({$rename: {'parent': 'parentId'}});
            const category = await Category.updateCategory(name, parent);
            return res.status(200).json({success: true, category});
        } catch (error) {
            return res.status(500).json({success: false, error: error});
        }
    }

    async delete(req, res) {
        try {
            const {id} = req.body;
            await Category.deleteCategory(id);
            return res.status(200).json({success: true});
        } catch (error) {
            return res.status(500).json({success: false, error: error});
        }
    }

    async findAll(req, res) {
        try {
            const {limit} = req.query;
            const result = await Category.getAll(limit);
            const categories = (await multipleMongooseToObject(result)).filter(category => category.name && category.slug)
            return res.status(200).json({success: true, categories: categories});
        } catch (error) {
            return res.status(500).json({success: false, error: error});
        }
    }

    async findOne(req, res) {
        try {
            const category = await Category.getById(req.param.id);
            return res.status(200).json({success: true, category});
        } catch (error) {
            return res.status(500).json({success: false, error: error});
        }
    }

    async findBySlug(req, res) {
        try {
            const {slug} = req.params;
            const category = await Category.getBySlug(slug);
            return res.status(200).json({success: true, category});
        } catch (error) {
            console.log(error)
            return res.status(500).json({success: false, error: error});
        }
    }
}

module.exports = new CategoryController