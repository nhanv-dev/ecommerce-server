const Cart = require('../models/Cart');
const CartItem = require('../models/CartItem');
const Product = require('../models/Product');

class CartController {
    async addToCart(req, res) {
        try {
            const customerId = req.user._id;
            const {id, quantity} = req.body;
            const product = await Product.findByProductId(id);
            if (product) {
                const cart = await Cart.getCartByUserId(customerId);
                if (!cart) {
                    const createCart = await Cart.saveCart(customerId, new Date(), product.basePrice * parseInt(quantity));
                    const cartDetail = await CartItem.saveCartItem(createCart._id, id, parseInt(quantity), product.basePrice);
                    return res.status(200).json({success: true, cart: cart, cartDetail: cartDetail});
                }
                const cartUpdate = await Cart.updateCart(customerId, cart.total + (product.basePrice * parseInt(quantity)));
                const cartItem = await CartItem.findOne({cartId: cartUpdate._id, productId: id});
                if (!cartItem) {
                    await CartItem.saveCartItem(cartUpdate._id, id, parseInt(quantity), product.basePrice);
                }
                await CartItem.updateCartItem(cartUpdate._id, id, cartItem.quantity + parseInt(quantity));
                return res.status(200).json({success: true, cart: cartUpdate});
            }
            return res.status(200).json({success: false, message: "Product not found"});
        } catch (error) {
            return res.status(500).json({success: false, error: error});
        }
    }
}

module.exports = new CartController;