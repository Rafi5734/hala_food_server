const express = require("express");
const Cart = require("../models/cart");
const router = express.Router();

// Add product to cart
router.post("/cart/add", async (req, res) => {
  const { productId } = req.body;

  try {
    // Get or create cart
    let cart = await Cart.findOne();
    if (!cart) {
      cart = new Cart({ products: [] });
    }

    // Check if the product already exists in the cart
    const productIndex = cart.products.findIndex(
      (p) => p.productId.toString() === productId
    );

    if (productIndex > -1) {
      // If product exists, update quantity
      cart.products[productIndex].quantity += 1;
    } else {
      // If not, add the product to the cart
      cart.products.push({ productId, quantity: 1 });
    }

    // Save the updated cart
    await cart.save();

    return res.status(200).json(cart);
  } catch (error) {
    return res.status(500).json({ error: "Something went wrong" });
  }
});

module.exports = router;
