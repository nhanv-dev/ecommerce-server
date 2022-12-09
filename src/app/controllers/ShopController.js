const Shop = require('../models/Shop');

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

    async findBySlug(req, res) {
        try {
            const shop = await Shop.findBySlug(req.params.slug);
            return res.status(200).json({success: true, shop});
        } catch (error) {
            return res.status(500).json({success: false, error: error});
        }
    }

}

const shopExample = {
    name: 'Gerrunt',
    description: 'Hà Nội',
    area: 'Hà Nội',
    address: 'Hà Nội',
    phone: '0932715315',
    email: 'jazashop@gmail.com',
    avatar: 'https://cf.shopee.vn/file/681dd7348ef4192f67f05a3bfaa6be1a_tn',
    background: 'https://cf.shopee.vn/file/681dd7348ef4192f67f05a3bfaa6be1a_tn',
    tags: [{tagName: 'shop+'}, {tagName: 'official'}],
    amountProducts: 2000,
    rating: 4.6,
    numberOfRating: 1703,
    rate: 4.3,
    followed: 23400,
    following: 76,
    responseRate: 99,
    responseTime: 'Đang cập nhật',
}

module.exports = new ShopController



