const userModel = require("./cart-model")

const userschema = require('./cart-model')




module.exports = {
  // Get cart
  getCart: async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.params.userId }).populate("items.product");
    if (!cart) return res.json({ items: [] });
    res.json(cart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
},

// Clear cart (after payment)
clearCart: async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.params.userId });
    if (!cart) return res.status(404).json({ message: "Cart not found" });
    cart.items = [];
    await cart.save();
    res.json({ message: "Cart cleared", cart });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
},

// Optional: update item quantity
updateItemQuantity: async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const cart = await Cart.findOne({ user: req.params.userId });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    const itemIndex = cart.items.findIndex(item => item.product.toString() === productId);
    if (itemIndex > -1) {
      cart.items[itemIndex].quantity = quantity;
      await cart.save();
      return res.json(cart);
    }
    res.status(404).json({ message: "Product not in cart" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
}
