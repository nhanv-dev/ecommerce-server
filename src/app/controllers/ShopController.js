const Shop = require('../models/Shop');
const Product = require('../models/Product');
const {mongooseToObject, multipleMongooseToObject} = require("../../utils/mongoose");

class ShopController {

    async save(req, res) {
        try {
            const shop = await Shop.saveShop(shopExample);
            return res.status(200).json({success: true, shop});
        } catch (error) {
            return res.status(500).json({success: false, error: error});
        }
    }

    async findAll(req, res) {
        try {
            const shop = await Shop.getAll(category);
            return res.status(200).json({success: true});
        } catch (error) {
            return res.status(500).json({success: false, error: error});
        }
    }

    async findOne(req, res) {
        try {

        } catch (error) {
            return res.status(500).json({success: false, error: error});
        }
    }

    async findByAccountId(req, res) {
        try {
            const shop = await Shop.findOne({accountId: req.user._id});
            return res.status(200).json({success: true, shop});
        } catch (error) {
            return res.status(500).json({success: false, error: error});
        }
    }

    async findBySlug(req, res) {
        try {
            const shop = await Shop.findBySlug(req.params.slug);
            return res.status(200).json({success: true, shop});
        } catch (error) {
            return res.status(500).json({success: false, error: error});
        }
    }

    async findRelatedByProductId(req, res) {
        try {
            const product = await mongooseToObject(await Product.findOne({_id: req.query.productId}));
            if (!product) return res.status(400).json({success: false, message: "Don't have product in store"})
            const shop = await mongooseToObject(await Shop.findOne({_id: product.shopId.toString()}));
            const relatedProducts = await multipleMongooseToObject(await Product.find({shopId: shop._id.toString()}).limit(10));
            return res.status(200).json({success: true, shop, relatedProducts});
        } catch (error) {
            return res.status(500).json({success: false, error: error});
        }
    }

    async findProducts(req, res) {
        try {
            const shop = await mongooseToObject(await Shop.findByAccountId(req.user._id));
            const products = await Product.findByShop({...shop});
            return res.status(200).json({success: true, shop, products});
        } catch (error) {
            return res.status(500).json({success: false, error: error});
        }
    }

    async findProductsByShopId(req, res) {
        try {
            const shop = await mongooseToObject(await Shop.findOne({_id: req.query.shopId}));
            const products = await Product.findByShop({...shop});
            return res.status(200).json({success: true, products});
        } catch (error) {
            return res.status(500).json({success: false, error: error});
        }
    }

    async searchShop(req, res) {
        try {
            const {searching} = req.query;
            const shopsByName = await multipleMongooseToObject(await Shop.find({
                name: {"$regex": searching, "$options": "i"},
            }));
            const shopsByAddress = await multipleMongooseToObject(await Shop.find({
                address: {"$regex": searching, "$options": "i"}
            }));
            const payload = [];
            [...shopsByName, ...shopsByAddress].forEach(shop => {
                const isExist = [...payload].filter(item => item._id.toString() === shop._id.toString())
                if (isExist.length === 0) payload.push(shop)
            })

            return res.status(200).json({success: true, shops: payload});
        } catch (error) {
            return res.status(500).json({success: false, error: error});
        }
    }
}

const shopExample = {
    name: 'yrshop | Beauty & Fashion',
    description: 'Mua online s???n ph???m c???a c???a h??ng yrshop | Beauty&Fashion tr??n Shopio.vn. ??? ch???t l?????ng cao, uy t??n, gi?? t???t ??? Ch??nh h??ng ??? Giao h??ng to??n qu???c',
    area: 'Tp. H??? Ch?? Minh',
    address: '879 Nguy???n Ki???m, Ph?????ng 3, Qu???n G?? V???p, TP.HCM',
    phone: '02822286333',
    email: 'yrshop@gmail.com',
    avatar: 'https://cf.shopee.vn/file/1569242bfcbeb4655180a58a641fb63a_tn',
    background: 'https://vcdn.tikicdn.com/ts/seller/8e/25/1b/c8c4bb3dd19235890818a8284cad3658.png',
    tags: [{tagName: 'shop+'}],
    amountProducts: 16,
    rating: 4.6,
    numberOfRating: 4.9,
    following: 1152,
    followed: 11903291,
    responseRate: 85,
    responseTime: '??ang c???p nh???t',
    accountId: '639c57e21f09b6870cd4e16c',
}

module.exports = new ShopController



