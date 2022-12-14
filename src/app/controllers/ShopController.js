const Shop = require('../models/Shop');
const Product = require('../models/Product');
const {mongooseToObject} = require("../../utils/mongoose");

class ShopController {

    async save(req, res) {
        try {
            console.log(req.body)
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

    async findProducts(req, res) {
        try {
            const shop = await mongooseToObject(await Shop.findByAccountId(req.user._id));
            const products = await Product.findByShop({...shop});
            return res.status(200).json({success: true, shop, products});
        } catch (error) {
            return res.status(500).json({success: false, error: error});
        }
    }
}

const shopExample = {
    name: 'Pigeon Official Store',
    description: 'Mua online sản phẩm của cửa hàng PIGEON OFFICIAL STORE trên Shopio. ✓ Chất lượng cao, uy tín, giá tốt ✓ Chính hãng ✓ Giao hàng toàn quốc',
    area: 'Tp. Hồ Chí Minh',
    address: 'Ấp Trạm Bơm, P.Tân Phú Trung, Q.Củ Chi, Tp. Hồ Chí Minh',
    phone: '0932715315',
    email: 'pigeonvnofficial@gmail.com',
    avatar: 'https://cf.shopee.vn/file/681dd7348ef4192f67f05a3bfaa6be1a_tn',
    background: 'https://cf.shopee.vn/file/681dd7348ef4192f67f05a3bfaa6be1a_tn',
    tags: [{tagName: 'shop+'}, {tagName: 'official'}],
    amountProducts: 162,
    rating: 4.9,
    numberOfRating: 23728,
    following: 2,
    followed: 133951,
    responseRate: 97,
    responseTime: 'Đang cập nhật',
    accountId: '63946ba0f997aa78bd2aacf7',
}

module.exports = new ShopController



