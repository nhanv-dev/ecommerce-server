const {multipleMongooseToObject, mongooseToObject} = require('../../utils/mongoose');
const Cart = require('../models/Cart');
const CartDetail = require('../models/CartDetail');
const Product = require('../models/Product');

class CartController {
    async addToCart(req, res) {
        try {
            const product = await Product.getProductById(req.body.id);
            if (product) {
                const cart = await Cart.getCartByUserId(req.user._id);
                if (cart) {
                    const {id} = cart;
                    const cartDetail = await CartDetail.findOne({cartId: id, productId: req.body.id});
                    const data = await Cart.updateCart(req.user._id, cart.total + product.sellPrice);
                    if (cartDetail) {
                        const cd = await new mongooseToObject(cartDetail);
                        const ucd = await CartDetail.updateCartDetail(id, req.body.id, cd.quantity + 1);
                    }
                    return res.status(200).json({
                        success: true,
                        message: "Updated cart successfull",
                        cart: data
                    });
                } else {
                    const createCart = new Cart({
                        customerId: req.user._id,
                        orderDate: new Date(),
                        total: product.sellPrice
                    });
                    const data = await createCart.save();
                    const {id} = data;
                    const cartDetail = new CartDetail({
                        cartId: id,
                        productId: req.body.id,
                        quantity: 1,
                        price: product.sellPrice
                    });
                    return res.status(200).json({
                        success: true,
                        message: "Added to cart successfull",
                        cart: data,
                        cartDetail: await cartDetail.save()
                    });
                }
            }
            return res.status(200).json({success: false, message: "Product not found"});
        } catch (error) {
            return res.status(500).json({success: false, error: error});
        }
    }
}

module.exports = new CartController;