const Cart = require('../models/Cart');
const CartItem = require('../models/CartItem');
const Product = require('../models/Product');
const Shop = require('../models/Shop');
const ProductCombination = require('../models/ProductCombination');
const {mongooseToObject, multipleMongooseToObject} = require("../../utils/mongoose");

class CartController {
    async addToCart(req, res) {
        try {
            const userId = req.user._id;
            const {productId, combinationId, quantity} = req.body;
            const product = await mongooseToObject(await Product.findOne({_id: productId}))
            const combination = await mongooseToObject(await ProductCombination.findOne({_id: combinationId}))
            if (!product) return res.status(202).json({success: false, message: "Product not found"});
            let cart = await mongooseToObject(await Cart.findOne({userId}));
            const data = {
                cart: {userId, ...cart},
                item: {productId, combinationId, combination, quantity}
            }
            if (!cart) cart = await mongooseToObject(await Cart.saveCart({...data.cart}))
            let cartItem = await mongooseToObject(await CartItem.findOne({
                cartId: cart._id.toString(),
                productId,
                combinationId
            }));
            if (!cartItem) cartItem = await mongooseToObject(await CartItem.saveCartItem({
                ...data.item,
                cartId: cart._id.toString()
            }));
            else cartItem = await mongooseToObject(await CartItem.updateCartItem({
                productId, combinationId,
                cartId: cart._id.toString(),
                quantity: cartItem.quantity + quantity,
            }));

            return res.status(200).json({success: true, cart, cartItem});
        } catch (error) {
            console.log(error)
            return res.status(500).json({success: false, error: error});
        }
    }

    async updateQuantity(req, res) {
        try {
            const userId = req.user._id;
            const {productId, combinationId, quantity} = req.body;
            const cart = await mongooseToObject(await Cart.findOne({userId}));

            if (!cart) return res.status(202).json({success: false, message: "Don't find cart of user"});
            const cartItem = await mongooseToObject(await CartItem.updateCartItem({
                cartId: cart._id.toString(), productId, combinationId, quantity
            }));

            return res.status(200).json({success: true, item: cartItem});
        } catch (error) {
            console.log(error)
            return res.status(500).json({success: false, error: error});
        }
    }

    async findByUserId(req, res) {
        try {
            let cart = await mongooseToObject(await Cart.findOne({userId: req.user._id}));
            if (!cart) cart = await mongooseToObject(await Cart.saveCart({userId: req.user._id}))
            await CartItem.find({cartId: cart._id.toString()}).then(async (res) => {
                const products = await multipleMongooseToObject(await Product.find({
                    _id: {$in: res.map(item => item.productId.toString())}
                }))
                const combinations = await multipleMongooseToObject(await ProductCombination.find({
                    _id: {$in: res.map(item => item.combinationId.toString())}
                }))
                const shops = await multipleMongooseToObject(await Shop.find({
                    _id: {$in: products.map(item => item.shopId.toString())}
                }))
                cart.items = await multipleMongooseToObject([...res]).map(item => {
                    const product = products.filter(product => product._id.toString() === item.productId.toString())
                    const combination = combinations.filter(combination => combination._id.toString() === item.combinationId.toString())
                    const shop = shops.filter(shop => product.length > 0 && shop._id.toString() === product[0].shopId.toString())
                    return {
                        ...item,
                        product: product.length > 0 && product[0],
                        shop: shop.length > 0 && shop[0],
                        combination: combination.length > 0 && combination[0]
                    }
                });
            });
            return res.status(200).json({success: true, cart});
        } catch (error) {
            console.log(error)
            return res.status(500).json({success: false, error})
        }
    }
}

module.exports = new CartController;