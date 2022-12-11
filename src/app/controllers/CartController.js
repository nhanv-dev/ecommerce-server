const {multipleMongooseToObject, mongooseToObject} = require('../../utils/mongoose');
const Cart = require('../models/Cart');
const CartItem = require('../models/CartItem');
const Product = require('../models/Product');

class CartController {
    async addToCart(req, res) {
        try {
            const productID = req.body.id;
            const qty = parseInt(req.body.quantity);
            const userID = req.user._id;
            const product = await Product.getProductById(productID);
            if (product) {
                const cart = await Cart.getCartByUserId(userID);
                if (!cart) {
                    const createCart = await Cart.saveCart({customerId: userID, total: product.sellPrice * qty});
                    const {id} = createCart;
                    const cartItem = await CartItem.saveCartItem({cartId: id, productId: productID, quantity: qty, price: product.sellPrice});
                    return res.status(200).json({success: true, cart: createCart, cartItem: cartItem});
                }
                const {id, total} = cart;
                const data = await Cart.updateCart(userID, total + (product.sellPrice * qty));
                const cartItemOld = await CartItem.getCartItemById(id, productID);
                if (cartItemOld) {
                    const {quantity} = cartItemOld;
                    await CartItem.updateCartItem(id, productID, quantity + qty);
                }
                return res.status(200).json({success: true, cart: data});
            }
            return res.status(200).json({success: false, message: "PRODUCT NOT FOUND"});
        } catch (error) {
            return res.status(500).json({success: false, error: error});
        }
    }
}

module.exports = new CartController;