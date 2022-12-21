const Product = require('../models/Product');
const ProductOption = require('../models/ProductOption');
const ProductOptionValue = require('../models/ProductOptionValue');
const ProductCombination = require('../models/ProductCombination');
const Category = require('../models/Category');
const Shop = require('../models/Shop');
const {mongooseToObject, multipleMongooseToObject} = require("../../utils/mongoose");

class ProductController {

    async save(req, res) {
        try {
            const {product, options, combinations} = req.body;
            if (!req.user || !req.user.shopId) return res.status(403).json({
                success: false, message: "You don't have permission to do that"
            });
            const shop = await mongooseToObject(await Shop.findOne({_id: req.user.shopId}));
            if (!shop) return res.status(403).json({
                success: false, message: "Don't find your shop in my database"
            });
            product.shopId = shop._id.toString();
            const savedProduct = await Product.saveProduct(product);
            const newOptions = options.map(item => ({
                name: item.option.name,
                productId: savedProduct._id.toString()
            }))
            const savedOptions = await ProductOption.insertMany([...newOptions]);
            const newOptionValues = []
            options.forEach(item => {
                item.values.forEach(value => {
                    const option = savedOptions.filter(o => o.name === item.option.name);
                    if (option.length > 0) {
                        const payload = {
                            name: value.name,
                            optionId: option[0]._id.toString()
                        };
                        newOptionValues.push(payload)
                    }
                })
            })
            const savedOptionValues = await ProductOptionValue.insertMany([...newOptionValues]);
            const newCombinations = combinations.map(combination => {
                return {
                    combinationString: combination.combinationString,
                    price: combination.price,
                    stock: combination.stock,
                    productId: savedProduct._id.toString()
                }
            })
            const savedCombinations = await ProductCombination.insertMany([...newCombinations]);
            return res.status(200).json({
                success: true,
                product: savedProduct,
                options: savedOptions,
                optionValues: savedOptionValues,
                combinations: savedCombinations
            });
        } catch (error) {
            return res.status(500).json({success: false, error: error});
        }
    }

    async update(req, res) {
        try {
            const {id} = req.params;
            const shop = await mongooseToObject(await Shop.findByAccountId(req.user._id));
            const existProduct = await mongooseToObject(await Product.findOne({_id: id}));
            if (existProduct.shopId.toString() !== shop._id.toString())
                return res.status(400).json({
                    success: false,
                    message: "You don't have permission to do that"
                });
            const {product} = req.body;
            await Product.findOneAndUpdate({_id: product._id}, product, {
                new: true, upsert: true, rawResult: true
            });
            const newProduct = await mongooseToObject(await Product.findOne({id}));
            const subCategory = await mongooseToObject(await Category.findOne({_id: newProduct.categoryId}));
            const parentCategory = await mongooseToObject(await Category.findOne({_id: subCategory.parentId}));
            return res.status(200).json({
                success: true,
                product: newProduct,
                category: {
                    parent: subCategory.parentId ? parentCategory : subCategory,
                    child: subCategory.parentId ? subCategory : null
                }
            });
        } catch (error) {
            return res.status(500).json({success: false, error: error});
        }
    }

    async sortNew(req, res) {
        try {
            const products = await Product.find().sort({'createdAt': 'desc'});
            return res.status(200).json({success: true, products});
        } catch (error) {
            return res.status(500).json({success: false, error: error});
        }
    }

    async findOne(req, res) {
        try {
            const {id, slug, detail} = req.query;
            let payload = {product: {}, category: {}, combinations: [], options: []};
            const product = await mongooseToObject(await Product.findOne({id, slug}));
            payload.product = product;
            const subCategory = await mongooseToObject(await Category.findOne({_id: product.categoryId}));
            const parentCategory = await mongooseToObject(await Category.findOne({_id: subCategory.parentId}));
            payload.category = {
                parent: parentCategory || null,
                child: subCategory || null
            }
            if (detail) {
                const detail = await Product.findDetail(product);
                payload = {...payload, ...detail}
            }
            return res.status(200).json({success: true, ...payload});
        } catch (error) {
            return res.status(500).json({success: false, error: error});
        }
    }

    async findCateId(req, res) {
        try {
            const categoryId = req.params.id;
            const products = await Product.find({categoryId});
            return res.status(200).json({success: true, product: products});
        } catch (error) {
            return res.status(500).json({success: false, error: error});
        }
    }


}

module.exports = new ProductController;

